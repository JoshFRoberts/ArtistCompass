const regKebap = new RegExp('([a-z0-9])([A-Z])', 'g');

export default {

    kebap(str) {
        return str.replace(regKebap, '$1-$2').toLowerCase();
    },

    capitalize(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}