
import row from '../../layout/row.vue';
import column from '../../layout/column.vue';

export default {

    props: {
        id: { type: String, required: false },
        description: { type: String, default: '' },
        "insertBeforeLabel": {
            "type": Boolean,
            "default": false
        },
        "icon": {
            "type": String,
            "default": ''
        },
        "prefixWidth": {
            "type": Number,
            "default": 0
        },
        "error": {
            "type": [Boolean, String],
            "default": false
        },
        "isText": {
            "type": Boolean,
            "default": true
        },
        "isBlock": {
            "type": Boolean,
            "default": false
        },
        "isRadio": {
            "type": Boolean,
            "default": false
        },
        "isCheckbox": {
            "type": Boolean,
            "default": false
        },
        "isToggle": {
            "type": Boolean,
            "default": false
        },
        "noMargin": {
            "type": Boolean,
            "default": false
        },
        "isGroup": {
            "type": Boolean,
            "default": false
        },
        "firstOfGroup": {
            "type": Boolean,
            "default": true
        },
        "required": {
            "type": Boolean,
            "default": false
        }
    },

    components: {
        "row" : row,
        "column" : column,
    }
}
