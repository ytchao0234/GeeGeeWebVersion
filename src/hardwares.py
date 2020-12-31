class Cpu:
    def __init__(self, collection):
        self.collection = collection
        
    def getList(self):
        return self.collection.find({}, {'_id': False}).sort("generation", -1)

class CpuCooler:
    def __init__(self, collection):
        self.collection = collection

    def getList(self):
        return self.collection.find({}, {'_id': False})

class MotherBoard:
    def __init__(self, collection):
        self.collection = collection

    def getList(self):
        return self.collection.find({}, {'_id': False})

class Memory:
    def __init__(self, collection):
        self.collection = collection

    def getList(self):
        return self.collection.find({}, {'_id': False})

class Disk:
    def __init__(self, collection):
        self.collection = collection

    def getList(self):
        return self.collection.find({}, {'_id': False})

class Graphic:
    def __init__(self, collection):
        self.collection = collection

    def getList(self):
        return self.collection.find({}, {'_id': False})

class Power:
    def __init__(self, collection):
        self.collection = collection

    def getList(self):
        return self.collection.find({}, {'_id': False})

class Crate:
    def __init__(self, collection):
        self.collection = collection

    def getList(self):
        return self.collection.find({}, {'_id': False})

