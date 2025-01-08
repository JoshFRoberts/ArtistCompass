
import base from '../base/base.js';
import prefixForm from './layout/prefixForm.vue'
import prefix from './layout/prefix.vue'
import defaultForm from './layout/defaultForm.vue'
import defaultLayout from './layout/default.vue'
import emptyLayout from './layout/empty.vue'
import filterForm from './layout/filterForm.vue'

export default {

    extends: base,

    name: "VueFormBaseInput",

    emits: ['update:modelValue'],

    props: {
        modelValue: {
            type: [String, Number, Object, Array, Boolean, null],
            default: null
        },
        "id": {
            "type": String,
            "required": false
        },
        "placeholder": {
            "type": String,
            "required": false
        },
        "layout": {
            "type": String,
            "default": "defaultForm"
        },
        "description": {
            "type": String,
            "required": false
        },
        "prefixWidth": {
            type: Number,
            default: 0
        },
        "insertBeforeLabel": {
            default: true
        },
        "icon": {
            "type": String,
            "required": false
        },
        "error": {
            "type": [Boolean, String],
            "default": false
        },
        "isGroup": {
            type: Boolean,
            default: false,
        },
        "value": {},
        "name": {
            "type": String,
        },
        "required": {
            "type": Boolean,
            "default": false
        }



    },

    components: {
        'prefixForm': prefixForm,
        'prefix': prefix,
        'defaultForm': defaultForm,
        'default': defaultLayout,
        'empty': emptyLayout,
        'filterForm': filterForm,
    },
}
