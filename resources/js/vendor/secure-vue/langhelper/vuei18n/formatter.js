export default class Formatter {

    constructor(options={}) {
        this._locale = options.locale || 'en-US';
        this._caches = Object.create(null);
    }

    interpolate (message, values) {
        let key = message,
            fn = this._caches[key];

        if (values && !fn) {
            fn = this.getFormatter(message);
            this._caches[key] = fn
        }
        return values ? [fn(values)] : [message];
    }

    getFormatter (message) {

        return function (values) {

            let result = message;
            if (values) {
                Object.keys(values).forEach(key => {

                    let search = key.toString(),
                        replace = values[key].toString(),
                        reg = new RegExp(`(:${search}|{${search}})`),
                        regUpper = new RegExp(`(:${search.toUpperCase()}|{${search.toUpperCase()}})`),
                        regUf = new RegExp(`(:${this.ucfirst(search)}|{${this.ucfirst(search)}})`),
                        regChoice = new RegExp('({[0-9]+}|\[[*0-9]+,[*0-9]+\])')
                    ;

                    result = result.replace(reg, replace)
                        .replace(regUpper, replace.toUpperCase())
                        .replace(regUf, this.ucfirst(replace))
                        .replace(regChoice, '')
                    ;
                })
            }
            return result;
        }.bind(this)
    }

    ucfirst (s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}
