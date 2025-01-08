import Str from '../Helper/Str';

const regAttrIsBool = new RegExp('^[0-9]+$');

export default {
    name: "base",

    props: {
        "mod": { "type": String, "default": ""},
        'padding': {
            "type": [Array, String],
            "default": () => { return [] }
        },
        'margin': {
            "default": () => { return [] }
        },
        "dataset": {
            "default": () => { return {} }
        },
        "attributes": {
            "default": () => { return {} }
        },
        "listeners": {
            "default": () => { return {} }
        },
    },

    data() {
        return {}
    },

    computed: {

        getAttributes() {
            let attrs = {},
                data = Object.assign({}, this.dataset || []);
            Object.keys(data).forEach(k => {
                let b = k.match(regAttrIsBool);
                attrs[Str.kebap((`data-${b ? data[k] : k}`))] = b ? '' : data[k];
            });
            data = Object.assign({}, this.attributes || []);
            Object.keys(data).forEach(k => {
                let b = k.match(regAttrIsBool);
                attrs[Str.kebap(b ? data[k] : k)] = b ? '' : data[k];
            });
            data = Object.assign({}, this.listeners || []);
            Object.keys(data).forEach(k => {
                attrs[!k.startsWith('on') ? 'on' + Str.capitalize(k) : k] = data[k];
            });

            return attrs;
        },
    },

    methods: {
        getPadding() {
            if ("string" === typeof this.padding) {
                return 'padding-' + this.padding;
            }
            return this.padding.map(p => {return 'padding-' + p}).join(' ')
        },

        getMargin() {
            if ("string" === typeof this.margin) {
                return 'margin-' + this.margin;
            }
            return this.margin.map(p => {return 'margin-' + p}).join(' ')
        }
    }
}