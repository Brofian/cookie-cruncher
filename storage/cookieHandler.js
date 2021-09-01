import {storageCache} from './storageCache.js';

class CookieHandler {

    init() {
        chrome.cookies.onChanged.addListener(this.onCookieChangeEvent.bind(this));
    }

    onCookieChangeEvent(info) {

        try {
            if(!info.removed) {
                let cookie = info.cookie;
                let data = storageCache.get(cookie.name);
                this.handleStorageResult(cookie, data);
            }
        }
        catch(e) {
            console.error(e);
        }

    }

    handleStorageResult(cookie, result) {
        try {
            let data = JSON.parse(result);

            //delete cookie if not allowed
            if(!data.allow) {
                this.removeCookie(cookie.name, cookie.domain, cookie.path, cookie.secure);
            }
        }
        catch(e) {
            storageCache.set(cookie.name, JSON.stringify({
                "name": cookie.name,
                "group": null,
                "allow": true
            }));
        }
    }


    removeCookie(name, domain, path, secure) {
        var url = "http" + (secure ? "s" : "") + "://" + domain + path;

        chrome.cookies.remove({
            "url": url,
            "name": name
        });
    }

}


var cookieHandler = new CookieHandler();
cookieHandler.init();

export { cookieHandler };