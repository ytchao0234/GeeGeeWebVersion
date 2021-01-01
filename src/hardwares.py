from functools import reduce

def switchMbSize(x):
    result = \
    {
        'eatx': ['eatx', 'atx', 'matx', 'itx'],
        'atx': ['atx', 'matx', 'itx'],
        'matx': ['matx', 'itx'],
        'itx': ['itx'],
    }.get(x)

    if not result:
        return ['eatx', 'atx', 'matx', 'itx']
    else:
        return result

class OriginList:
    def __init__(self):
        self.list = dict()

    def setList(self, originList):
        self.list = originList

class Cpu:
    def __init__(self, collection):
        self.collection = collection
        
    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}).sort("generation", -1))

    def getList(self, chosenHardwares, originList):
        filters = originList.list['cpuList']

        if chosenHardwares['mbList']:
            chosenMbList = list(filter(lambda x: x['name'] == chosenHardwares['mbList'][0], originList.list['mbList']))
            filters = list(filter(lambda x: x['pin'] == chosenMbList[0]['pin'], filters))

        if chosenHardwares['ramList']:
            chosenRamList = list()
            for chosenRam in chosenHardwares['ramList']:
                chosenRamList.append(list(filter(lambda x: x['name'] == chosenRam, originList.list['ramList']))[0])

            ramCapacity = 0
            if chosenRamList:
                ramCapacity = reduce(lambda x, y: x + y['capacity'] if type(x) == int else x['capacity'] + y['capacity'], chosenRamList)

            filters = list(filter(lambda x: x['ramMaximumSupport'] >= ramCapacity and \
                                            x['ramGenerationSupport'] == chosenRamList[0]['ramType'], filters))

        if chosenHardwares['powerList']:
            chosenPowerList = list(filter(lambda x: x['name'] == chosenHardwares['powerList'][0], originList.list['powerList']))

            chosenGraphicList = list()
            if chosenHardwares['graphicList']:
                for chosenGraphic in chosenHardwares['graphicList']:
                    chosenGraphicList.append(list(filter(lambda x: x['name'] == chosenGraphic, originList.list['graphicList']))[0])

            graphicTDP = 0
            if chosenGraphicList:
                graphicTDP = reduce(lambda x, y: x['TDP'] + y['TDP'], chosenGraphicList)

            filters = list(filter(lambda x: 2 * (x['TDP'] + graphicTDP) <= chosenPowerList[0]['watts'], filters))

        return filters

class CpuCooler:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenHardwares, originList):
        filters = originList.list['coolerList']

        if chosenHardwares['crateList']:
            chosenCrateList = list(filter(lambda x: x['name'] == chosenHardwares['crateList'][0], originList.list['crateList']))
            filters = list(filter(lambda x: x['height'] <= chosenCrateList[0]['coolerHeight'], filters))

        return filters

class MotherBoard:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenHardwares, originList):
        filters = originList.list['mbList']

        if chosenHardwares['cpuList']:
            chosenCpuList = list(filter(lambda x: x['name'] == chosenHardwares['cpuList'][0], originList.list['cpuList']))
            filters = list(filter(lambda x: x['pin'] == chosenCpuList[0]['pin'], filters))

        if chosenHardwares['ramList']:
            chosenRamList = list()
            for chosenRam in chosenHardwares['ramList']:
                chosenRamList.append(list(filter(lambda x: x['name'] == chosenRam, originList.list['ramList']))[0])

            ramCapacity = 0
            if chosenRamList:
                ramCapacity = reduce(lambda x, y: x + y['capacity'] if type(x) == int else x['capacity'] + y['capacity'], chosenRamList)

            filters = list(filter(lambda x: x['ramType'] == chosenRamList[0]['ramType'] and \
                                            x['ramMaximum'] >= ramCapacity and \
                                            x['ramQuantity'] >= len(chosenRamList), filters))

        if chosenHardwares['graphicList']:
            chosenGraphicList = list()
            for chosenGraphic in chosenHardwares['graphicList']:
                chosenGraphicList.append(list(filter(lambda x: x['name'] == chosenGraphic, originList.list['graphicList']))[0])

            filters = list(filter(lambda x: x['pcieQuantity'] >= len(chosenGraphicList), filters))

        if chosenHardwares['diskList']:
            chosenDiskList = list()
            for chosenDisk in chosenHardwares['diskList']:
                chosenDiskList.append(list(filter(lambda x: x['name'] == chosenDisk, originList.list['diskList']))[0])

            m2TypePcie = any(map(lambda x: x['diskType'] == 'pcie' and x['size'] == 'm.2', chosenDiskList))
            m2TypeSata = any(map(lambda x: x['diskType'] == 'sata' and x['size'] == 'm.2', chosenDiskList))

            supportM2 = ''

            if m2TypePcie and m2TypeSata:
                supportM2 = 'pcie/sata'
            elif m2TypePcie:
                supportM2 = 'pcie'
            elif m2TypeSata:
                supportM2 = 'sata'
                
            sata3Disk = list(filter(lambda x: x['diskType'] == 'sata' and x['size'] != 'm.2', chosenDiskList))
            m2Disk = list(filter(lambda x: x['size'] == 'm.2', chosenDiskList))

            filters = list(filter(lambda x: ((supportM2 in x['m2Type']) or x['m2Type'] == 'n/a') and \
                                            x['sata3Quantity'] >= len(sata3Disk) and x['m2Quantity'] >= len(m2Disk), filters))

        if chosenHardwares['crateList']:
            chosenCrateList = list(filter(lambda x: x['name'] == chosenHardwares['crateList'][0], originList.list['crateList']))
            supperMbSize = switchMbSize(chosenCrateList[0]['mbSize'])
            filters = list(filter(lambda x: x['size'] in supperMbSize, filters))

        return filters

class Ram:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenHardwares, originList):
        filters = originList.list['ramList']

        if chosenHardwares['cpuList']:
            chosenCpuList = list(filter(lambda x: x['name'] == chosenHardwares['cpuList'][0], originList.list['cpuList']))
            filters = list(filter(lambda x: x['ramType'] == chosenCpuList[0]['ramGenerationSupport'], filters))

        if chosenHardwares['mbList']:
            chosenMbList = list(filter(lambda x: x['name'] == chosenHardwares['mbList'][0], originList.list['mbList']))
            filters = list(filter(lambda x: x['ramType'] == chosenMbList[0]['ramType'], filters))

        if chosenHardwares['ramList']:
            chosenRamList = list(filter(lambda x: x['name'] == chosenHardwares['ramList'][0], originList.list['ramList']))
            filters = list(filter(lambda x: x['ramType'] == chosenRamList[0]['ramType'], filters))

        return filters

class Disk:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenHardwares, originList):
        filters = originList.list['diskList']
        chosenDiskList = list()

        if chosenHardwares['diskList']:
            for chosenDisk in chosenHardwares['diskList']:
                chosenDiskList.append(list(filter(lambda x: x['name'] == chosenDisk, originList.list['diskList']))[0])
            
        if chosenHardwares['mbList']:
            chosenMbList = list(filter(lambda x: x['name'] == chosenHardwares['mbList'][0], originList.list['mbList']))

            m2TypePcie = 'pcie' in chosenMbList[0]['m2Type']
            m2TypeSata = 'sata' in chosenMbList[0]['m2Type']

            if m2TypePcie and not m2TypeSata:
                filters = list(filter(lambda x: x['diskType'] == 'pcie' or x['size'] != 'm.2', filters))

            elif not m2TypePcie and m2TypeSata:
                filters = list(filter(lambda x: x['diskType'] == 'sata' or x['size'] != 'm.2', filters))

            sata3Disk = list(filter(lambda x: x['diskType'] == 'sata' and x['size'] != 'm.2', chosenDiskList))
            m2Disk = list(filter(lambda x: x['size'] == 'm.2', chosenDiskList))
            
            if chosenMbList[0]['sata3Quantity'] <= len(sata3Disk):
                filters = list(filter(lambda x: x['diskType'] != 'sata' or x['size'] == 'm.2', filters))

            if chosenMbList[0]['m2Quantity'] <= len(m2Disk):
                filters = list(filter(lambda x: x['size'] != 'm.2', filters))

        if chosenHardwares['crateList']:
            chosenCrateList = list(filter(lambda x: x['name'] == chosenHardwares['crateList'][0], originList.list['crateList']))
            disk3_5 = list(filter(lambda x: x['size'] == '3.5', chosenDiskList))

            if chosenCrateList[0]['diskQuantity'] <= len(disk3_5):
                filters = list(filter(lambda x: x['size'] != '3.5', filters))

        return filters

class Graphic:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenHardwares, originList):
        filters = originList.list['graphicList']

        if chosenHardwares['crateList']:
            chosenCrateList = list(filter(lambda x: x['name'] == chosenHardwares['crateList'][0], originList.list['crateList']))
            filters = list(filter(lambda x: x['length'] <= chosenCrateList[0]['vgaLength'], filters))

        return filters

class Power:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenHardwares, originList):
        filters = originList.list['powerList']

        cpuTDP = 0
        if chosenHardwares['cpuList']:
            chosenCpuList = list(filter(lambda x: x['name'] == chosenHardwares['cpuList'][0], originList.list['cpuList']))
            cpuTDP = chosenCpuList[0]['TDP']

        graphicTDP = 0
        if chosenHardwares['graphicList']:
            chosenGraphicList = list()
            for chosenGraphic in chosenHardwares['graphicList']:
                chosenGraphicList.append(list(filter(lambda x: x['name'] == chosenGraphic, originList.list['graphicList']))[0])
                
            if chosenGraphicList:
                graphicTDP = reduce(lambda x, y: x['TDP'] + y['TDP'], chosenGraphicList)

        filters = list(filter(lambda x: x['watts'] >= 2 * (cpuTDP + graphicTDP), filters))

        if chosenHardwares['crateList']:
            chosenCrateList = list(filter(lambda x: x['name'] == chosenHardwares['crateList'][0], originList.list['crateList']))

            filters = list(filter(lambda x: x['size'] == chosenCrateList[0]['psuSize'] and \
                                            x['length'] <= chosenCrateList[0]['psuLength'], filters))

        return filters

class Crate:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenHardwares, originList):
        filters = originList.list['crateList']

        if chosenHardwares['coolerList']:
            chosenCoolerList = list(filter(lambda x: x['name'] == chosenHardwares['coolerList'][0], originList.list['coolerList']))
            filters = list(filter(lambda x: x['coolerHeight'] >= chosenCoolerList[0]['height'], filters))

        if chosenHardwares['mbList']:
            chosenMbList = list(filter(lambda x: x['name'] == chosenHardwares['mbList'][0], originList.list['mbList']))
            filters = list(filter(lambda x: chosenMbList[0]['size'] in switchMbSize(x['mbSize']), filters))

        if chosenHardwares['graphicList']:
            chosenGraphicList = list()
            for chosenGraphic in chosenHardwares['graphicList']:
                chosenGraphicList.append(list(filter(lambda x: x['name'] == chosenGraphic, originList.list['graphicList']))[0])
                
            filters = list(filter(lambda x: x['vgaLength'] >= chosenGraphicList[0]['length'], filters))

        if chosenHardwares['powerList']:
            chosenPowerList = list(filter(lambda x: x['name'] == chosenHardwares['powerList'][0], originList.list['powerList']))
            filters = list(filter(lambda x: x['psuSize'] == chosenPowerList[0]['size'] and \
                                            x['psuLength'] >= chosenPowerList[0]['length'], filters))
        
        if chosenHardwares['diskList']:
            chosenDisk3_5List = list()
            for chosenDisk3_5 in chosenHardwares['diskList']:
                chosenDisk3_5List.append(list(filter(lambda x: x['name'] == chosenDisk3_5 and x['size'] == '3.5', originList.list['diskList']))[0])

            filters = list(filter(lambda x: x['diskQuantity'] >= len(chosenDisk3_5List), filters))

        return filters
