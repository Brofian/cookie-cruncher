class StorageCache {

    init() {
        this.chestStorageKey = 'cookieChest';
        this.chest = {};

        this.getStorage(this.chestStorageKey, this.load.bind(this));

        console.log("Init storage cache");
    }

    test() {
        return "erfolgreich!";
    }

    load(result) {
        try {
            this.chest = JSON.parse(result[this.chestStorageKey]);
        }
        catch(e) {
            console.warn("Couldnt load cookieChest! Creating an empty one!");
            this.chest = {};
            this.save();
        }
    }

    save() {
        this.setStorage(this.chestStorageKey, JSON.stringify(this.chest));
    }

    get(key) {
        console.log("GET " + key);
        if(this.chest[key]) {
            return this.chest[key];
        }
        return null;
    }

    set(key, value) {
        console.log("SET " + key);
        this.chest[key] = value;
        this.save();
    }

    setStorage(key, value, callback = null) {
        chrome.storage.sync.set({ [key]: value }, callback);
    }

    getStorage(key, callback = null) {
        chrome.storage.sync.get([key], callback);
    }

}

var storageCache = new StorageCache();
storageCache.init();

export {storageCache};