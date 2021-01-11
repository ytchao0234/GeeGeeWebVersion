from flask import Flask, render_template, redirect, url_for, request, jsonify
from pymongo import MongoClient, ASCENDING, DESCENDING
import numpy as np
from src.credential import database
from src.hardwares import SuggestionList, SearchList, ChosenList, OriginList, Cpu, CpuCooler, MotherBoard, Ram, Disk, Graphic, Power, Crate

app = Flask(__name__)

client = MongoClient(f"mongodb://{database.get('username')}:{database.get('password')}@{database.get('host')}/?authSource={database.get('authSource')}", retryWrites=False)

db = client['javaTest2']
cpuCollection    = db['cpu']
coolerCollection = db['cooler']
mbCollection     = db['mb']
ramCollection    = db['ram']
diskCollection   = db['disk']
vgaCollection    = db['vga']
psuCollection    = db['psu']
crateCollection  = db['crate']

cpu     = Cpu(cpuCollection)
cooler  = CpuCooler(coolerCollection)
mb      = MotherBoard(mbCollection)
ram     = Ram(ramCollection)
disk    = Disk(diskCollection)
graphic = Graphic(vgaCollection)
power   = Power(psuCollection)
crate   = Crate(crateCollection)

originList = OriginList()
chosenList = ChosenList()
suggestionList = SuggestionList()
searchList = SearchList()

@app.route('/')
def index():
    return redirect(url_for('home'))

def switch(x):
    return \
    {
        'cpu': cpu.getList,
        'cooler': cooler.getList,
        'motherBoard': mb.getList,
        'ram': ram.getList,
        'disk': disk.getList,
        'graphic': graphic.getList,
        'power': power.getList,
        'crate': crate.getList,
    }.get(x)

def switchOrigin(x):
    return \
    {
        'cpu': 'cpuList',
        'cooler': 'coolerList',
        'motherBoard': 'mbList',
        'ram': 'ramList',
        'disk': 'diskList',
        'graphic': 'graphicList',
        'power': 'powerList',
        'crate': 'crateList',
    }.get(x)

@app.route('/getHardwareList', methods=['POST'], strict_slashes=False)
def getHardwareList():
    inputData = request.get_json()
    try:
        chosenHardwares = inputData['chosenHardwares']
        chosen = chosenList.getList(chosenHardwares, originList)
        hardwareList = dict([
            ('cpuList', cpu.getList(chosen, originList)),
            ('coolerList', cooler.getList(chosen, originList)),
            ('mbList', mb.getList(chosen, originList)),
            ('ramList', ram.getList(chosen, originList)),
            ('diskList', disk.getList(chosen, originList)),
            ('graphicList', graphic.getList(chosen, originList)),
            ('powerList', power.getList(chosen, originList)),
            ('crateList', crate.getList(chosen, originList)),
        ])
    except Exception as e:
        print(e)

        return jsonify({"error": e}), 500

    return jsonify(hardwareList), 200

@app.route('/getOriginList', methods=['GET'], strict_slashes=False)
def getOriginList():
    try:
        hardwareList = originList.list
    except Exception as e:
        print(e)

        return jsonify({"error": e}), 500

    return jsonify(hardwareList), 200

@app.route('/getSuggestion', methods=['POST'])
def getSuggestion():
    inputData = request.get_json()
    try:
        chosenHardwares = inputData['chosenHardwares']
        chosen = chosenList.getList(chosenHardwares, originList)
        [suggestion, conflict] = suggestionList.getList(chosen)

        ramExceed = any(map(lambda x: ("記憶體容量" in x) or ("記憶體插槽" in x), suggestion))
        graphicExceed = any(map(lambda x: "PCIe插槽" in x, suggestion))
        diskExceed = any(map(lambda x: ("M.2接口" in x) or ("SATA接口" in x) or ("3.5吋硬碟架" in x), suggestion))

        ramType = None
        if chosen['cpuList']:
            ramType = chosen['cpuList'][0]['ramGenerationSupport']
        elif chosen['mbList']:
            ramType = chosen['mbList'][0]['ramType']
        elif chosen['ramList']:
            ramType = chosen['ramList'][0]['ramType']

        diskType = "pcie/sata"
        if chosen['mbList']:
            diskType = chosen['mbList'][0]['m2Type']
        if chosen['crateList']:
            if len(list(filter(lambda x: x['size'] == '3.5', chosen['diskList']))) >= chosen['crateList'][0]['diskQuantity']:
                diskType += "notAllow3.5"
    except Exception as e:
        print(e)

        return jsonify({"error": e}), 500

    return jsonify({'suggestion': suggestion,
                    'conflict': conflict,
                    'ramExceed': ramExceed,
                    'graphicExceed': graphicExceed,
                    'diskExceed': diskExceed,
                    'ramType': ramType,
                    'diskType': diskType}) \
                    , 200

@app.route('/getSearch', methods=['POST'])
def getSearch():
    inputData = request.get_json()
    try:
        searchStr = inputData['search']
        hardwareList = inputData['hardwareList']
        searchResult = searchList.getList(searchStr, hardwareList)
    except Exception as e:
        print(e)

        return jsonify({"error": e}), 500

    return jsonify(searchResult), 200

@app.route('/home', methods=['GET'])
def home():
    origin = dict([
        ('cpuList', cpu.getOriginalList()),
        ('coolerList', cooler.getOriginalList()),
        ('mbList', mb.getOriginalList()),
        ('ramList', ram.getOriginalList()),
        ('diskList', disk.getOriginalList()),
        ('graphicList', graphic.getOriginalList()),
        ('powerList', power.getOriginalList()),
        ('crateList', crate.getOriginalList()),
    ])
    originList.setList(origin)

    return render_template('mainPage.html')

@app.route('/record', methods=['GET'])
def record():
    return render_template('recordPage.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
