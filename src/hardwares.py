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

class ChosenList:
    def __init__(self):
        self.list = dict([
            ('cpuList', list()),
            ('coolerList', list()),
            ('mbList', list()),
            ('ramList', list()),
            ('diskList', list()),
            ('graphicList', list()),
            ('powerList', list()),
            ('crateList', list()),
        ])

    def setList(self, chosenHardwares, originList):
        if chosenHardwares['cpuList']:
            self.list['cpuList'] = list(filter(lambda x: x['name'] == chosenHardwares['cpuList'][0], originList.list['cpuList']))
            
        if chosenHardwares['coolerList']:
            self.list['coolerList'] = list(filter(lambda x: x['name'] == chosenHardwares['coolerList'][0], originList.list['coolerList']))

        if chosenHardwares['mbList']:
            self.list['mbList'] = list(filter(lambda x: x['name'] == chosenHardwares['mbList'][0], originList.list['mbList']))

        if chosenHardwares['ramList']:
            self.list['ramList'] = list()
            for chosenRam in chosenHardwares['ramList']:
                self.list['ramList'].append(list(filter(lambda x: x['name'] == chosenRam, originList.list['ramList']))[0])

        if chosenHardwares['diskList']:
            self.list['diskList'] = list()
            for chosenDisk in chosenHardwares['diskList']:
                self.list['diskList'].append(list(filter(lambda x: x['name'] == chosenDisk, originList.list['diskList']))[0])

        if chosenHardwares['graphicList']:
            self.list['graphicList'] = list()
            for chosenGraphic in chosenHardwares['graphicList']:
                self.list['graphicList'].append(list(filter(lambda x: x['name'] == chosenGraphic, originList.list['graphicList']))[0])
        
        if chosenHardwares['powerList']:
            self.list['powerList'] = list(filter(lambda x: x['name'] == chosenHardwares['powerList'][0], originList.list['powerList']))

        if chosenHardwares['crateList']:
            self.list['crateList'] = list(filter(lambda x: x['name'] == chosenHardwares['crateList'][0], originList.list['crateList']))

class Cpu:
    def __init__(self, collection):
        self.collection = collection
        
    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}).sort("generation", -1))

    def getList(self, chosenList, originList):
        filters = originList.list['cpuList']

        if chosenList.list['mbList']:
            filters = list(filter(lambda x: x['pin'] == chosenList.list['mbList'][0]['pin'], filters))

        if chosenList.list['ramList']:
            ramCapacity = 0
            if chosenList.list['ramList']:
                ramCapacity = reduce(lambda x, y: x + y['capacity'] if type(x) == int else x['capacity'] + y['capacity'], chosenList.list['ramList'])

            filters = list(filter(lambda x: x['ramMaximumSupport'] >= ramCapacity and \
                                            x['ramGenerationSupport'] == chosenList.list['ramList'][0]['ramType'], filters))

        if chosenList.list['powerList']:
            graphicTDP = 0
            if chosenList.list['graphicList']:
                graphicTDP = reduce(lambda x, y: x + y['TDP'] if type(x) == int else x['TDP'] + y['TDP'], chosenList.list['graphicList'])

            filters = list(filter(lambda x: 2 * (x['TDP'] + graphicTDP) <= chosenList.list['powerList'][0]['watts'], filters))

        return filters

class CpuCooler:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['coolerList']

        if chosenList.list['crateList']:
            filters = list(filter(lambda x: x['height'] <= chosenList.list['crateList'][0]['coolerHeight'], filters))

        return filters

class MotherBoard:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['mbList']

        print(chosenList.list['cpuList'])
        if chosenList.list['cpuList']:
            filters = list(filter(lambda x: x['pin'] == chosenList.list['cpuList'][0]['pin'], filters))

        if chosenList.list['ramList']:
            ramCapacity = 0
            if chosenList.list['ramList']:
                ramCapacity = reduce(lambda x, y: x + y['capacity'] if type(x) == int else x['capacity'] + y['capacity'], chosenList.list['ramList'])

            filters = list(filter(lambda x: x['ramType'] == chosenList.list['ramList'][0]['ramType'] and \
                                            x['ramMaximum'] >= ramCapacity and \
                                            x['ramQuantity'] >= len(chosenList.list['ramList']), filters))

        if chosenList.list['graphicList']:
            filters = list(filter(lambda x: x['pcieQuantity'] >= len(chosenList.list['graphicList']), filters))

        if chosenList.list['diskList']:
            m2TypePcie = any(map(lambda x: x['diskType'] == 'pcie' and x['size'] == 'm.2', chosenList.list['diskList']))
            m2TypeSata = any(map(lambda x: x['diskType'] == 'sata' and x['size'] == 'm.2', chosenList.list['diskList']))

            supportM2 = ''

            if m2TypePcie and m2TypeSata:
                supportM2 = 'pcie/sata'
            elif m2TypePcie:
                supportM2 = 'pcie'
            elif m2TypeSata:
                supportM2 = 'sata'
                
            sataDisk = list(filter(lambda x: x['diskType'] == 'sata' and x['size'] != 'm.2', chosenList.list['diskList']))
            m2Disk = list(filter(lambda x: x['size'] == 'm.2', chosenList.list['diskList']))

            filters = list(filter(lambda x: ((supportM2 in x['m2Type']) or x['m2Type'] == 'n/a') and \
                                            x['sata3Quantity'] >= len(sataDisk) and x['m2Quantity'] >= len(m2Disk), filters))

        if chosenList.list['crateList']:
            supperMbSize = switchMbSize(chosenList.list['crateList'][0]['mbSize'])
            filters = list(filter(lambda x: x['size'] in supperMbSize, filters))

        return filters

class Ram:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['ramList']

        if chosenList.list['cpuList']:
            filters = list(filter(lambda x: x['ramType'] == chosenList.list['cpuList'][0]['ramGenerationSupport'], filters))

        if chosenList.list['mbList']:
            filters = list(filter(lambda x: x['ramType'] == chosenList.list['mbList'][0]['ramType'], filters))

        if chosenList.list['ramList']:
            filters = list(filter(lambda x: x['ramType'] == chosenList.list['ramList'][0]['ramType'], filters))

        return filters

class Disk:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['diskList']
            
        if chosenList.list['mbList']:
            m2TypePcie = 'pcie' in chosenList.list['mbList'][0]['m2Type']
            m2TypeSata = 'sata' in chosenList.list['mbList'][0]['m2Type']

            if m2TypePcie and not m2TypeSata:
                filters = list(filter(lambda x: x['diskType'] == 'pcie' or x['size'] != 'm.2', filters))

            elif not m2TypePcie and m2TypeSata:
                filters = list(filter(lambda x: x['diskType'] == 'sata' or x['size'] != 'm.2', filters))

            sataDisk = list(filter(lambda x: x['diskType'] == 'sata' and x['size'] != 'm.2', chosenList.list['diskList']))
            m2Disk = list(filter(lambda x: x['size'] == 'm.2', chosenList.list['diskList']))
            
            if chosenList.list['mbList'][0]['sata3Quantity'] <= len(sataDisk):
                filters = list(filter(lambda x: x['diskType'] != 'sata' or x['size'] == 'm.2', filters))

            if chosenList.list['mbList'][0]['m2Quantity'] <= len(m2Disk):
                filters = list(filter(lambda x: x['size'] != 'm.2', filters))

        if chosenList.list['crateList']:
            disk3_5 = list(filter(lambda x: x['size'] == '3.5', chosenList.list['diskList']))

            if chosenList.list['crateList'][0]['diskQuantity'] <= len(disk3_5):
                filters = list(filter(lambda x: x['size'] != '3.5', filters))

        return filters

class Graphic:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['graphicList']

        if chosenList.list['crateList']:
            filters = list(filter(lambda x: x['length'] <= chosenList.list['crateList'][0]['vgaLength'], filters))

        return filters

class Power:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['powerList']

        graphicTDP = 0
        if chosenList.list['graphicList']:
            graphicTDP = reduce(lambda x, y: x + y['TDP'] if type(x) == int else x['TDP'] + y['TDP'], chosenList.list['graphicList'])

        filters = list(filter(lambda x: x['watts'] >= 2 * (chosenList.list['cpuList'][0]['TDP'] + graphicTDP), filters))

        if chosenList.list['crateList']:
            filters = list(filter(lambda x: x['size'] == chosenList.list['crateList'][0]['psuSize'] and \
                                            x['length'] <= chosenList.list['crateList'][0]['psuLength'], filters))

        return filters

class Crate:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['crateList']

        if chosenList.list['coolerList']:
            filters = list(filter(lambda x: x['coolerHeight'] >= chosenList.list['coolerList'][0]['height'], filters))

        if chosenList.list['mbList']:
            filters = list(filter(lambda x: chosenList.list['mbList'][0]['size'] in switchMbSize(x['mbSize']), filters))

        if chosenList.list['graphicList']:                
            filters = list(filter(lambda x: x['vgaLength'] >= chosenList.list['graphicList'][0]['length'], filters))

        if chosenList.list['powerList']:
            filters = list(filter(lambda x: x['psuSize'] == chosenList.list['powerList'][0]['size'] and \
                                            x['psuLength'] >= chosenList.list['powerList'][0]['length'], filters))
        
        if chosenList.list['diskList']:
            disk3_5 = list(filter(lambda x: x['size'] == '3.5', chosenList.list['diskList']))
            filters = list(filter(lambda x: x['diskQuantity'] >= len(disk3_5), filters))

        return filters

class SuggestionList:
    def __init__(self):
        self.list = []

    def setList(self, chosenList):
        self.list.clear()

        try:
            if chosenList.list['cpuList'] and chosenList.list['mbList'][0]:
                if chosenList.list['cpuList'][0]['pin'] != chosenList.list['mbList'][0]['pin']:
                    self.list.append("CPU和主機板腳位不符合哦！\nCPU: " + \
                                     chosenList.list['cpuList'][0]['pin'] + \
                                     "\n主機板: " + chosenList.list['mbList'][0]['pin'])
        except Exception as e:
            print(e)

        try:
            if chosenList.list['coolerList'][0]['height'] > chosenList.list['crateList'][0]['coolerHeight']:
                self.list.append("機殼裝不下CPU散熱器耶！\n機殼: " + \
                                 str(chosenList.list['crateList'][0]['coolerHeight']) + \
                                 "\nCPU散熱器: " + str(chosenList.list['coolerList'][0]['height']) )
        except Exception as e:
            print(e)

        try:
            if chosenList.list['mbList'][0]['ramQuantity'] < len(chosenList.list['ramList']):
                self.list.append("主機板的記憶體插槽不夠插哦！\n主機板: " + \
                                 str(chosenList.list['mbList'][0]['ramQuantity']) + \
                                 "\n記憶體: " + str(len(chosenList.list['ramList'])))
        except Exception as e:
            print(e)

        try:
            if chosenList.list['mbList'][0]['pcieQuantity'] < len(chosenList.list['graphicList']):
                self.list.append("主機板的PCIe插槽不夠插哦！\n主機板: " + \
                                 str(chosenList.list['mbList'][0]['pcieQuantity']) + \
                                 "\n顯示卡: " + str(len(chosenList.list['graphicList'])))
        except Exception as e:
            print(e)

        try:
            m2Disk = list(filter(lambda x: x['size'] == 'm.2', chosenList.list['diskList']))

            if chosenList.list['mbList'][0]['m2Quantity'] < len(m2Disk):
                self.list.append("主機板的M.2接口不夠囉！\n主機板: " + \
                                 str(chosenList.list['mbList'][0]['m2Quantity']) + \
                                 "\nM.2硬碟: " + str(len(m2Disk)))
        except Exception as e:
            print(e)

        try:
            sataDisk = list(filter(lambda x: x['diskType'] == 'sata' and x['size'] != 'm.2', chosenList.list['diskList'])) 

            if chosenList.list['mbList'][0]['m2Quantity'] < len(sataDisk):
                self.list.append("主機板的SATA接口不夠囉！\n主機板: " + \
                                 str(chosenList.list['mbList'][0]['sata3Quantity']) + \
                                 "\nSATA硬碟: " + str(len(sataDisk)))
        except Exception as e:
            print(e)
        
        try:
            m2TypePcie = any(map(lambda x: x['diskType'] == 'pcie' and x['size'] == 'm.2', chosenList.list['diskList']))
            m2TypeSata = any(map(lambda x: x['diskType'] == 'sata' and x['size'] == 'm.2', chosenList.list['diskList']))

            supportM2 = ''

            if m2TypePcie and m2TypeSata:
                supportM2 = 'pcie/sata'
            elif m2TypePcie:
                supportM2 = 'pcie'
            elif m2TypeSata:
                supportM2 = 'sata'

            if supportM2 not in chosenList.list['mbList'][0]['m2Type']:
                self.list.append("主機板的M.2插槽不能插這種M.2硬碟哦！\n主機板: " + \
                                 chosenList.list['mbList'][0]['m2Type'] + \
                                 "\nM.2硬碟: " + supportM2)
        except Exception as e:
            print(e)

        try:
            if chosenList.list['mbList'][0]['size'] not in switchMbSize(chosenList.list['crateList'][0]['mbSize']):
                self.list.append("機殼裝不下主機板耶！\n機殼: " + \
                                 chosenList.list['crateList'][0]['mbSize'] + \
                                 "\n主機板: " + chosenList.list['mbList'][0]['size'])
        except Exception as e:
            print(e)

        try:
            ramAreValid = list(map(lambda x: x['ramType'] == chosenList.list['cpuList'][0]['ramGenerationSupport'], chosenList.list['ramList']))

            if not all(ramAreValid):
                self.list.append("有記憶體與CPU支援的代數不符合哦！\n記憶體: " + \
                                 chosenList.list['ramList'][ramAreValid.index(False)]['ramType'] + \
                                 "\nCPU: " + chosenList.list['cpuList'][0]['ramGenerationSupport'])
        except Exception as e:
            print(e)

        try:
            ramAreValid = list(map(lambda x: x['ramType'] == chosenList.list['mbList'][0]['ramType'], chosenList.list['ramList']))

            if not all(ramAreValid):
                self.list.append("主機板支援的代數與記憶體不符合哦！\n主機板: " + \
                                 chosenList.list['mbList'][0]['ramType'] + \
                                 "\n記憶體: " + chosenList.list['ramList'][ramAreValid.index(False)]['ramType'])
        except Exception as e:
            print(e)

        try:
            ramCapacity = 0
            if chosenList.list['ramList']:
                if chosenList.list['ramList']:
                    ramCapacity = reduce(lambda x, y: x + y['capacity'] if type(x) == int else x['capacity'] + y['capacity'], chosenList.list['ramList'])
            
            if ramCapacity > chosenList.list['mbList'][0]['ramMaximum']:
                self.list.append("記憶體容量超過主機板支援的容量大小囉！\n記憶體: " + \
                                 str(ramCapacity) + \
                                 "\n主機板: " + str(chosenList.list['mbList'][0]['ramMaximum']))
        except Exception as e:
            print(e)

        try:
            disk3_5 = list(filter(lambda x: x['size'] == '3.5', chosenList.list['diskList']))

            if chosenList.list['crateList'][0]['diskQuantity'] < len(disk3_5):
                self.list.append("機殼的3.5吋硬碟架不夠耶！\n機殼: " + \
                                 str(chosenList.list['crateList'][0]['diskQuantity']) + \
                                 "\n3.5吋硬碟: " + str(len(disk3_5)))
        except Exception as e:
            print(e)

        try:
            graphicAreValid = list(map(lambda x: x['length'] <= chosenList.list['crateList'][0]['vgaLength'], chosenList.list['graphicList']))

            if not all(graphicAreValid):
                self.list.append("有顯示卡裝不進機殼耶！\n顯示卡: " + \
                                 str(chosenList.list['graphicList'][graphicAreValid.index(False)]['length']) + \
                                 "\n機殼: " + str(chosenList.list['crateList'][0]['vgaLength']))
        except Exception as e:
            print(e)

        try:
            if chosenList.list['cpuList'][0]['internalGraphic'] == 'n/a':
                self.list.append("CPU沒有內顯，記得要裝顯示卡唷！")
        except Exception as e:
            print(e)

        try:
            if chosenList.list['mbList'][0]['graphicOutput'] == 'n/a':
                self.list.append("主機板沒有顯示輸出，記得要裝顯示卡唷！")
        except Exception as e:
            print(e)

        try:
            graphicTDP = 0
            if chosenList.list['graphicList']:
                graphicTDP = reduce(lambda x, y: x + y['TDP'] if type(x) == int else x['TDP'] + y['TDP'], chosenList.list['graphicList'])

            if chosenList.list['powerList'][0]['watts'] < 2 * ( chosenList.list['cpuList'][0]['TDP'] + graphicTDP):
                self.list.append("電源供應器的瓦數不足哦！\n電源供應器: " + \
                                 str(chosenList.list['powerList'][0]['watts']) + \
                                 "\nCPU TDP: " + str(chosenList.list['cpuList'][0]['TDP']) + \
                                 "\n顯示卡TDP: " + str(graphicTDP))
        except Exception as e:
            print(e)

        try:
            if chosenList.list['powerList'][0]['size'] != chosenList.list['crateList'][0]['psuSize']:
                self.list.append("電源供應器與機殼大小不符合哦！\n電源供應器: " + \
                                 chosenList.list['powerList'][0]['size'] + \
                                 "\n機殼: " + chosenList.list['crateList'][0]['psuSize'])
        except Exception as e:
            print(e)

        try:
            if chosenList.list['powerList'][0]['length'] != chosenList.list['crateList'][0]['psuLength']:
                self.list.append("電源供應器與機殼長度不符合哦！\n電源供應器: " + \
                                 str(chosenList.list['powerList'][0]['length']) + \
                                 "\n機殼: " + str(chosenList.list['crateList'][0]['psuLength']))
        except Exception as e:
            print(e)
        
