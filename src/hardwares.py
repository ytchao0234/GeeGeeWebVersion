from functools import reduce

class CurrentList:
    def __init__(self):
        self.list = dict()

    def setList(self, currentList):
        self.list = currentList

class Cpu:
    def __init__(self, collection):
        self.collection = collection
        
    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}).sort("generation", -1))

    def getList(self, chosenHardwares, currentList):
        filters = self.getOriginalList()

        if chosenHardwares['mbList']:
            chosenMbList = list(filter(lambda x: x['name'] == chosenHardwares['mbList'][0], currentList.list['mbList']))
            filters = list(filter(lambda x: x['pin'] == chosenMbList[0]['pin'], filters))

        if chosenHardwares['ramList']:
            chosenRamList = list(filter(lambda x: any(map(lambda y: y == x['name'], chosenHardwares['ramList'])), currentList.list['ramList']))
            ramCapacity = reduce(lambda x, y: x['capacity'] + y['capacity'], chosenRamList)
            filters = list(filter(lambda x: x['ramMaximumSupport'] >= ramCapacity, filters))
            filters = list(filter(lambda x: x['ramGenerationSupport'] == chosenRamList[0]['ramType'], filters))

        return filters

class CpuCooler:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

class MotherBoard:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

class Ram:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

class Disk:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

class Graphic:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

class Power:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

class Crate:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

