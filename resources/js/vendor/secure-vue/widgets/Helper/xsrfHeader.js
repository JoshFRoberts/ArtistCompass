class XsrfHeader {
    isEncrypted() {
        try {
            let xsrfCookie = JSON.parse(atob(decodeURIComponent(document.cookie.split(';').map(s => s.trim()).find(s => s.indexOf('XSRF-TOKEN') === 0).split('=').pop()))).value;
            return true;
        } catch(e) {
            return false;
        }
    }

    setDefaultHeader() {
        //set xsrfHeaderName, use X-CSRF-TOKEN when Cookie is encrypted
        //use X-XSRF-TOKEN when Cookie is not encrypted
        if(this.isEncrypted()) {
            window.axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
        } else {
            window.axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
        }
    }
}

export default XsrfHeader;
