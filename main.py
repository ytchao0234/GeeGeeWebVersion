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

@app.route('/hardwareList', methods=['POST'], strict_slashes=False)
def hardwareList():
    inputData = request.get_json()
    try:
        hardware = inputData['hardware']
        chosenHardwares = inputData['chosenHardwares']
        chosen = chosenList.getList(chosenHardwares, originList)
        hardwareList = switch(hardware)(chosen, originList)
    except Exception as e:
        print(e)

        return jsonify({"error": e}), 500

    print(hardwareList)
    return jsonify(hardwareList), 200

@app.route('/suggestion', methods=['POST'])
def suggestion():
    inputData = request.get_json()
    try:
        chosenHardwares = inputData['chosenHardwares']
        chosen = chosenList.getList(chosenHardwares, originList)
        suggestion = suggestionList.getList(chosen)
        ramExeed = False
        if chosen['mbList']:
            ramExeed = chosen['mbList'][0]['ramQuantity'] >= len(chosen['ramList'])
    except Exception as e:
        print(e)

        return jsonify({"error": e}), 500

    return jsonify({'suggestion': suggestion,
                    'ramExeed': ramExeed}) \
                    , 200

@app.route('/search', methods=['POST'])
def search():
    inputData = request.get_json()
    try:
        hardware = inputData['hardware']
        searchStr = inputData['search']
        chosenHardwares = inputData['chosenHardwares']
        chosen = chosenList.getList(chosenHardwares, originList)
        hardwareList = switch(hardware)(chosen, originList)
        searchResult = searchList.getList(searchStr, hardwareList)
    except Exception as e:
        print(e)

        return jsonify({"error": e}), 500

    return jsonify(searchResult), 200

@app.route('/home', methods=['GET'])
def home():
    return render_template('mainPage.html')

@app.route('/record')
def record():
    return render_template('recordPage.html')

@app.route('/testtest', methods=['GET'])
def testtest():
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

    return render_template('test.html')

if __name__ == '__main__':
    app.run(debug=True)
