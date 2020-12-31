from flask import Flask, render_template, redirect, url_for, request, jsonify
from pymongo import MongoClient, ASCENDING, DESCENDING
import numpy as np
from src.credential import database
from src.hardwares import Cpu, CpuCooler, MotherBoard, Memory, Disk, Graphic, Power, Crate

app = Flask(__name__)

client = MongoClient(f"mongodb://{database.get('username')}:{database.get('password')}@{database.get('host')}/?authSource={database.get('authSource')}", retryWrites=False)

db = client['javaTest2']
cpuCollection    = db['cpu']
coolerCollection = db['cooler']
mbCollection     = db['mb']
memoryCollection = db['ram']
diskCollection   = db['disk']
vgaCollection    = db['vga']
psuCollection    = db['psu']
crateCollection  = db['crate']

cpu     = Cpu(cpuCollection)
cooler  = CpuCooler(coolerCollection)
mb      = MotherBoard(mbCollection)
memory  = Memory(memoryCollection)
disk    = Disk(diskCollection)
graphic = Graphic(vgaCollection)
power   = Power(psuCollection)
crate   = Crate(crateCollection)

@app.route('/')
def index():
    return redirect(url_for('home'))

def switch(x):
    return \
    {
        'cpu': cpu.getList,
        'cooler': cooler.getList,
        'motherBoard': mb.getList,
        'memory': memory.getList,
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
        hardwareList = list(switch(hardware)())
    except Exception as e:
        print(e)
        hardwareList = "ERROR: Failed to get data"

        return jsonify({"status": hardwareList}), 500

    return jsonify(hardwareList), 200

@app.route('/home', methods=['GET'])
def home():
    inputData = request.get_json()
    try:
        hardwareList = switch(inputData['hardware'])()
        print(hardwareList)
    except:
        hardwareList = "ERROR: Failed to get data"

    return render_template('mainPage.html', hardwareList=hardwareList)

@app.route('/record')
def record():
    return render_template('recordPage.html')

@app.route('/suggestion', methods=['GET'], strict_slashes=False)
def suggestion():
    try:
        pass
    except Exception as e:
        pass

    return jsonify({'test':'test'}), 200

@app.route('/testtest', methods=['GET'])
def testtest():
    return render_template('test.html')

if __name__ == '__main__':
    app.run(debug=True)
