

export default class CacheUtil {


    constructor() {
        this.cacheMap = new Map();
        this.instance = null;
    }

    static getInstance() {

        if(!this.instance) {

            this.instance = new CacheUtil();
        }
        return this.instance;
    }

    put(key: any, value: any): void {

        this.cacheMap.set(key, value);
    }

    get(key: any): any {

        return this.cacheMap.get(key);
    }

    remove(key: any): Boolean {

        return this.cacheMap.delete(key);
    }
}

