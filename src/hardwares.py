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
        pass

    def getList(self, chosenHardwares, originList):
        chosen = dict([
            ('cpuList', list()),
            ('coolerList', list()),
            ('mbList', list()),
            ('ramList', list()),
            ('diskList', list()),
            ('graphicList', list()),
            ('powerList', list()),
            ('crateList', list()),
        ])

        if chosenHardwares['cpuList']:
            chosen['cpuList'] = list(filter(lambda x: x['name'] == chosenHardwares['cpuList'][0], originList.list['cpuList']))
            
        if chosenHardwares['coolerList']:
            chosen['coolerList'] = list(filter(lambda x: x['name'] == chosenHardwares['coolerList'][0], originList.list['coolerList']))
            customList = list(filter(lambda x: x.find('custom') == 0, chosenHardwares['coolerList']))

            if customList:
                for custom in customList:
                    chosen['coolerList'].append(dict([
                        ('name', custom),
                        ('height', int(custom.split(' ')[1].split('cm')[0])),
                    ]))

        if chosenHardwares['mbList']:
            chosen['mbList'] = list(filter(lambda x: x['name'] == chosenHardwares['mbList'][0], originList.list['mbList']))

        if chosenHardwares['ramList']:
            chosen['ramList'] = list()
            for chosenRam in chosenHardwares['ramList']:
                RamIsFound = list(filter(lambda x: x['name'] == chosenRam, originList.list['ramList']))
                if RamIsFound:
                    chosen['ramList'].append(RamIsFound[0])

            customList = list(filter(lambda x: x.find('custom') == 0, chosenHardwares['ramList']))
            if customList:
                for custom in customList:
                    attrList = custom.split(' ')
                    chosen['ramList'].append(dict([
                        ('name', custom),
                        ('ramType', attrList[1].lower()),
                        ('capacity', int(attrList[2].split('G')[0])),
                    ]))

        if chosenHardwares['diskList']:
            chosen['diskList'] = list()
            for chosenDisk in chosenHardwares['diskList']:
                diskIsFound = list(filter(lambda x: x['name'] == chosenDisk, originList.list['diskList']))
                if diskIsFound:
                    chosen['diskList'].append(diskIsFound[0])

            customList = list(filter(lambda x: x.find('custom') == 0, chosenHardwares['diskList']))

            if customList:
                for custom in customList:
                    attrList = custom.split(' ')
                    chosen['diskList'].append(dict([
                        ('name', custom),
                        ('size', attrList[1].lower()),
                        ('diskType', attrList[2].lower()),
                        ('capacity', int(attrList[3].replace('G', '').replace('T', '000'))),
                    ]))

        if chosenHardwares['graphicList']:
            chosen['graphicList'] = list()
            for chosenGraphic in chosenHardwares['graphicList']:
                GraphicIsFound = list(filter(lambda x: x['name'] == chosenGraphic, originList.list['graphicList']))
                if GraphicIsFound:
                    chosen['graphicList'].append(GraphicIsFound[0])

            customList = list(filter(lambda x: x.find('custom') == 0, chosenHardwares['graphicList']))
            if customList:
                for custom in customList:
                    attrList = custom.split(' ')
                    chosen['graphicList'].append(dict([
                        ('name', custom),
                        ('length', int(attrList[1].split('cm')[0])),
                        ('TDP', int(attrList[2].split('W')[0])),
                    ]))
        
        if chosenHardwares['powerList']:
            chosen['powerList'] = list(filter(lambda x: x['name'] == chosenHardwares['powerList'][0], originList.list['powerList']))
            customList = list(filter(lambda x: x.find('custom') == 0, chosenHardwares['powerList']))

            if customList:
                for custom in customList:
                    attrList = custom.split(' ')
                    chosen['powerList'].append(dict([
                        ('name', custom),
                        ('length', int(attrList[1].split('cm')[0])),
                        ('watts', int(attrList[2].split('W')[0])),
                        ('size', attrList[3].lower()),
                    ]))

        if chosenHardwares['crateList']:
            chosen['crateList'] = list(filter(lambda x: x['name'] == chosenHardwares['crateList'][0], originList.list['crateList']))
            customList = list(filter(lambda x: x.find('custom') == 0, chosenHardwares['crateList']))

            if customList:
                for custom in customList:
                    attrList = custom.split(' ')
                    chosen['crateList'].append(dict([
                        ('name', custom),
                        ('mbSize', attrList[1].lower()),
                        ('vgaLength', int(attrList[2].split('cm')[0])),
                        ('psuSize', attrList[3].lower()),
                        ('psuLength', int(attrList[4].split('cm')[0])),
                        ('coolerHeight', int(attrList[5].split('cm')[0])),
                        ('diskQuantity', int(attrList[6].split('個')[0])),
                    ]))

        return chosen

class Cpu:
    def __init__(self, collection):
        self.collection = collection
        
    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}).sort("generation", -1))

    def getList(self, chosenList, originList):
        filters = originList.list['cpuList']

        if chosenList['mbList']:
            filters = list(filter(lambda x: x['pin'] == chosenList['mbList'][0]['pin'], filters))

        if chosenList['ramList']:
            ramCapacity = 0
            if chosenList['ramList']:
                ramCapacity = reduce(lambda x, y: x + y['capacity'] if type(x) == int else x['capacity'] + y['capacity'], chosenList['ramList'])

            filters = list(filter(lambda x: x['ramMaximumSupport'] >= ramCapacity and \
                                            x['ramGenerationSupport'] == chosenList['ramList'][0]['ramType'], filters))

        if chosenList['powerList']:
            graphicTDP = 0
            if chosenList['graphicList']:
                graphicTDP = reduce(lambda x, y: x + y['TDP'] if type(x) == int else x['TDP'] + y['TDP'], chosenList['graphicList'])

            filters = list(filter(lambda x: 2 * (x['TDP'] + graphicTDP) <= chosenList['powerList'][0]['watts'], filters))

        return filters

class CpuCooler:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['coolerList']

        if chosenList['crateList']:
            filters = list(filter(lambda x: x['height'] <= chosenList['crateList'][0]['coolerHeight'], filters))

        return filters

class MotherBoard:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['mbList']

        print(chosenList['cpuList'])
        if chosenList['cpuList']:
            filters = list(filter(lambda x: x['pin'] == chosenList['cpuList'][0]['pin'], filters))

        if chosenList['ramList']:
            ramCapacity = 0
            if chosenList['ramList']:
                ramCapacity = reduce(lambda x, y: x + y['capacity'] if type(x) == int else x['capacity'] + y['capacity'], chosenList['ramList'])

            filters = list(filter(lambda x: x['ramType'] == chosenList['ramList'][0]['ramType'] and \
                                            x['ramMaximum'] >= ramCapacity and \
                                            x['ramQuantity'] >= len(chosenList['ramList']), filters))

        if chosenList['graphicList']:
            filters = list(filter(lambda x: x['pcieQuantity'] >= len(chosenList['graphicList']), filters))

        if chosenList['diskList']:
            m2TypePcie = any(map(lambda x: x['diskType'] == 'pcie' and x['size'] == 'm.2', chosenList['diskList']))
            m2TypeSata = any(map(lambda x: x['diskType'] == 'sata' and x['size'] == 'm.2', chosenList['diskList']))

            supportM2 = ''

            if m2TypePcie and m2TypeSata:
                supportM2 = 'pcie/sata'
            elif m2TypePcie:
                supportM2 = 'pcie'
            elif m2TypeSata:
                supportM2 = 'sata'
                
            sataDisk = list(filter(lambda x: x['diskType'] == 'sata' and x['size'] != 'm.2', chosenList['diskList']))
            m2Disk = list(filter(lambda x: x['size'] == 'm.2', chosenList['diskList']))

            filters = list(filter(lambda x: ((supportM2 in x['m2Type']) or x['m2Type'] == 'n/a') and \
                                            x['sata3Quantity'] >= len(sataDisk) and x['m2Quantity'] >= len(m2Disk), filters))

        if chosenList['crateList']:
            supperMbSize = switchMbSize(chosenList['crateList'][0]['mbSize'])
            filters = list(filter(lambda x: x['size'] in supperMbSize, filters))

        return filters

class Ram:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['ramList']

        if chosenList['cpuList']:
            filters = list(filter(lambda x: x['ramType'] == chosenList['cpuList'][0]['ramGenerationSupport'], filters))

        if chosenList['mbList']:
            filters = list(filter(lambda x: x['ramType'] == chosenList['mbList'][0]['ramType'], filters))

        if chosenList['ramList']:
            filters = list(filter(lambda x: x['ramType'] == chosenList['ramList'][0]['ramType'], filters))

        return filters

class Disk:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['diskList']
            
        if chosenList['mbList']:
            m2TypePcie = 'pcie' in chosenList['mbList'][0]['m2Type']
            m2TypeSata = 'sata' in chosenList['mbList'][0]['m2Type']

            if m2TypePcie and not m2TypeSata:
                filters = list(filter(lambda x: x['diskType'] == 'pcie' or x['size'] != 'm.2', filters))

            elif not m2TypePcie and m2TypeSata:
                filters = list(filter(lambda x: x['diskType'] == 'sata' or x['size'] != 'm.2', filters))

            sataDisk = list(filter(lambda x: x['diskType'] == 'sata' and x['size'] != 'm.2', chosenList['diskList']))
            m2Disk = list(filter(lambda x: x['size'] == 'm.2', chosenList['diskList']))
            
            if chosenList['mbList'][0]['sata3Quantity'] <= len(sataDisk):
                filters = list(filter(lambda x: x['diskType'] != 'sata' or x['size'] == 'm.2', filters))

            if chosenList['mbList'][0]['m2Quantity'] <= len(m2Disk):
                filters = list(filter(lambda x: x['size'] != 'm.2', filters))

        if chosenList['crateList']:
            disk3_5 = list(filter(lambda x: x['size'] == '3.5', chosenList['diskList']))

            if chosenList['crateList'][0]['diskQuantity'] <= len(disk3_5):
                filters = list(filter(lambda x: x['size'] != '3.5', filters))

        return filters

class Graphic:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['graphicList']

        if chosenList['crateList']:
            filters = list(filter(lambda x: x['length'] <= chosenList['crateList'][0]['vgaLength'], filters))

        return filters

class Power:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['powerList']

        graphicTDP = 0
        if chosenList['graphicList']:
            graphicTDP = reduce(lambda x, y: x + y['TDP'] if type(x) == int else x['TDP'] + y['TDP'], chosenList['graphicList'])

        cpuTDP = 0
        if chosenList['cpuList']:
            cpuTDP = chosenList['cpuList'][0]['TDP']
            
        filters = list(filter(lambda x: x['watts'] >= 2 * (cpuTDP + graphicTDP), filters))

        if chosenList['crateList'] and chosenList['crateList']:
            filters = list(filter(lambda x: x['size'] == chosenList['crateList'][0]['psuSize'] and \
                                            x['length'] <= chosenList['crateList'][0]['psuLength'], filters))

        return filters

class Crate:
    def __init__(self, collection):
        self.collection = collection

    def getOriginalList(self):
        return list(self.collection.find({}, {'_id': False}))

    def getList(self, chosenList, originList):
        filters = originList.list['crateList']

        if chosenList['coolerList']:
            filters = list(filter(lambda x: x['coolerHeight'] >= chosenList['coolerList'][0]['height'], filters))

        if chosenList['mbList']:
            filters = list(filter(lambda x: chosenList['mbList'][0]['size'] in switchMbSize(x['mbSize']), filters))

        if chosenList['graphicList']:                
            filters = list(filter(lambda x: x['vgaLength'] >= chosenList['graphicList'][0]['length'], filters))

        if chosenList['powerList']:
            filters = list(filter(lambda x: x['psuSize'] == chosenList['powerList'][0]['size'] and \
                                            x['psuLength'] >= chosenList['powerList'][0]['length'], filters))
        
        if chosenList['diskList']:
            disk3_5 = list(filter(lambda x: x['size'] == '3.5', chosenList['diskList']))
            filters = list(filter(lambda x: x['diskQuantity'] >= len(disk3_5), filters))

        return filters

class SuggestionList:
    def __init__(self):
        pass

    def getList(self, chosenList):
        suggestion = list()

        try:
            if chosenList['cpuList'][0]['pin'] != chosenList['mbList'][0]['pin']:
                suggestion.append("CPU和主機板腳位不符合哦！\nCPU: " + \
                                 chosenList['cpuList'][0]['pin'] + \
                                 "\n主機板: " + chosenList['mbList'][0]['pin'])
        except Exception as e:
            print(e)

        try:
            if chosenList['coolerList'][0]['height'] > chosenList['crateList'][0]['coolerHeight']:
                suggestion.append("機殼裝不下CPU散熱器耶！\n機殼: " + \
                                 str(chosenList['crateList'][0]['coolerHeight']) + \
                                 "\nCPU散熱器: " + str(chosenList['coolerList'][0]['height']) )
        except Exception as e:
            print(e)

        try:
            if chosenList['mbList'][0]['ramQuantity'] < len(chosenList['ramList']):
                suggestion.append("主機板的記憶體插槽不夠插哦！\n主機板: " + \
                                 str(chosenList['mbList'][0]['ramQuantity']) + \
                                 "\n記憶體: " + str(len(chosenList['ramList'])))
        except Exception as e:
            print(e)

        try:
            if chosenList['mbList'][0]['pcieQuantity'] < len(chosenList['graphicList']):
                suggestion.append("主機板的PCIe插槽不夠插哦！\n主機板: " + \
                                 str(chosenList['mbList'][0]['pcieQuantity']) + \
                                 "\n顯示卡: " + str(len(chosenList['graphicList'])))
        except Exception as e:
            print(e)

        try:
            m2Disk = list(filter(lambda x: x['size'] == 'm.2', chosenList['diskList']))

            if chosenList['mbList'][0]['m2Quantity'] < len(m2Disk):
                suggestion.append("主機板的M.2接口不夠囉！\n主機板: " + \
                                 str(chosenList['mbList'][0]['m2Quantity']) + \
                                 "\nM.2硬碟: " + str(len(m2Disk)))
        except Exception as e:
            print(e)

        try:
            sataDisk = list(filter(lambda x: x['diskType'] == 'sata' and x['size'] != 'm.2', chosenList['diskList'])) 

            if chosenList['mbList'][0]['m2Quantity'] < len(sataDisk):
                suggestion.append("主機板的SATA接口不夠囉！\n主機板: " + \
                                 str(chosenList['mbList'][0]['sata3Quantity']) + \
                                 "\nSATA硬碟: " + str(len(sataDisk)))
        except Exception as e:
            print(e)
        
        try:
            m2TypePcie = any(map(lambda x: x['diskType'] == 'pcie' and x['size'] == 'm.2', chosenList['diskList']))
            m2TypeSata = any(map(lambda x: x['diskType'] == 'sata' and x['size'] == 'm.2', chosenList['diskList']))

            supportM2 = ''

            if m2TypePcie and m2TypeSata:
                supportM2 = 'pcie/sata'
            elif m2TypePcie:
                supportM2 = 'pcie'
            elif m2TypeSata:
                supportM2 = 'sata'

            if supportM2 not in chosenList['mbList'][0]['m2Type']:
                suggestion.append("主機板的M.2插槽不能插這種M.2硬碟哦！\n主機板: " + \
                                 chosenList['mbList'][0]['m2Type'] + \
                                 "\nM.2硬碟: " + supportM2)
        except Exception as e:
            print(e)

        try:
            if chosenList['mbList'][0]['size'] not in switchMbSize(chosenList['crateList'][0]['mbSize']):
                suggestion.append("機殼裝不下主機板耶！\n機殼: " + \
                                 chosenList['crateList'][0]['mbSize'] + \
                                 "\n主機板: " + chosenList['mbList'][0]['size'])
        except Exception as e:
            print(e)

        try:
            ramAreValid = list(map(lambda x: x['ramType'] == chosenList['cpuList'][0]['ramGenerationSupport'], chosenList['ramList']))

            if not all(ramAreValid):
                suggestion.append("有記憶體與CPU支援的代數不符合哦！\n記憶體: " + \
                                 chosenList['ramList'][ramAreValid.index(False)]['ramType'] + \
                                 "\nCPU: " + chosenList['cpuList'][0]['ramGenerationSupport'])
        except Exception as e:
            print(e)

        try:
            ramAreValid = list(map(lambda x: x['ramType'] == chosenList['mbList'][0]['ramType'], chosenList['ramList']))

            if not all(ramAreValid):
                suggestion.append("主機板支援的代數與記憶體不符合哦！\n主機板: " + \
                                 chosenList['mbList'][0]['ramType'] + \
                                 "\n記憶體: " + chosenList['ramList'][ramAreValid.index(False)]['ramType'])
        except Exception as e:
            print(e)

        try:
            ramCapacity = 0
            if chosenList['ramList']:
                if chosenList['ramList']:
                    ramCapacity = reduce(lambda x, y: x + y['capacity'] if type(x) == int else x['capacity'] + y['capacity'], chosenList['ramList'])
            
            if ramCapacity > chosenList['mbList'][0]['ramMaximum']:
                suggestion.append("記憶體容量超過主機板支援的容量大小囉！\n記憶體: " + \
                                 str(ramCapacity) + \
                                 "\n主機板: " + str(chosenList['mbList'][0]['ramMaximum']))
        except Exception as e:
            print(e)

        try:
            disk3_5 = list(filter(lambda x: x['size'] == '3.5', chosenList['diskList']))

            if chosenList['crateList'][0]['diskQuantity'] < len(disk3_5):
                suggestion.append("機殼的3.5吋硬碟架不夠耶！\n機殼: " + \
                                 str(chosenList['crateList'][0]['diskQuantity']) + \
                                 "\n3.5吋硬碟: " + str(len(disk3_5)))
        except Exception as e:
            print(e)

        try:
            graphicAreValid = list(map(lambda x: x['length'] <= chosenList['crateList'][0]['vgaLength'], chosenList['graphicList']))

            if not all(graphicAreValid):
                suggestion.append("有顯示卡裝不進機殼耶！\n顯示卡: " + \
                                 str(chosenList['graphicList'][graphicAreValid.index(False)]['length']) + \
                                 "\n機殼: " + str(chosenList['crateList'][0]['vgaLength']))
        except Exception as e:
            print(e)

        try:
            if chosenList['cpuList'][0]['internalGraphic'] == 'n/a':
                suggestion.append("CPU沒有內顯，記得要裝顯示卡唷！")
        except Exception as e:
            print(e)

        try:
            if chosenList['mbList'][0]['graphicOutput'] == 'n/a':
                suggestion.append("主機板沒有顯示輸出，記得要裝顯示卡唷！")
        except Exception as e:
            print(e)

        try:
            graphicTDP = 0
            if chosenList['graphicList']:
                graphicTDP = reduce(lambda x, y: x + y['TDP'] if type(x) == int else x['TDP'] + y['TDP'], chosenList['graphicList'])

            if chosenList['powerList'][0]['watts'] < 2 * ( chosenList['cpuList'][0]['TDP'] + graphicTDP):
                suggestion.append("電源供應器的瓦數不足哦！\n電源供應器: " + \
                                 str(chosenList['powerList'][0]['watts']) + \
                                 "\nCPU TDP: " + str(chosenList['cpuList'][0]['TDP']) + \
                                 "\n顯示卡TDP: " + str(graphicTDP))
        except Exception as e:
            print(e)

        try:
            if chosenList['powerList'][0]['size'] != chosenList['crateList'][0]['psuSize']:
                suggestion.append("電源供應器與機殼大小不符合哦！\n電源供應器: " + \
                                 chosenList['powerList'][0]['size'] + \
                                 "\n機殼: " + chosenList['crateList'][0]['psuSize'])
        except Exception as e:
            print(e)

        try:
            if chosenList['powerList'][0]['length'] > chosenList['crateList'][0]['psuLength']:
                suggestion.append("電源供應器與機殼長度不符合哦！\n電源供應器: " + \
                                 str(chosenList['powerList'][0]['length']) + \
                                 "\n機殼: " + str(chosenList['crateList'][0]['psuLength']))
        except Exception as e:
            print(e)

        return suggestion

class SearchList:
    def __init__(self):
        pass

    def getList(self, searchStr, hardwareList):
        filters = hardwareList
        searchList = searchStr.split(' ')

        for search in searchList:
            filters = list(filter(lambda x: search in x['name'], filters))

        return filters
