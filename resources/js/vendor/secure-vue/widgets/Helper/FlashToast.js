import store from "../vuex";

class FlashToast {

    /**
     * show error message
     * @param {String} title
     * @param {String} message
     * @param {String} type
     */
    error(message, title = '', type = 'toast', important = false) {
        this._addFlashToast(title, message, type, 'error', important);
    }

    /**
     * show success message
     * @param {String} title
     * @param {String} message
     * @param {String} type
     */
    success(message, title = '', type = 'toast', important = false) {
        this._addFlashToast(title, message, type, 'success', important);
    }

    /**
     * show info message
     * @param {String} title
     * @param {String} message
     * @param {String} type
     */
    info(message, title = '',  type = 'toast', important = false) {
        this._addFlashToast(title, message, type, 'info', important);
    }

    /**
     * show warning message
     * @param {String} title
     * @param {String} message
     * @param {String} type
     */
    warning(message, title = '', type = 'toast', important = false) {
        this._addFlashToast(title, message, type, 'warning', important);
    }

    _addFlashToast(title, message, type = 'toast', level = 'success', important = false) {
        const data = {
            'level': level,
            'title': title,
            'message': message,
            'important': important
        };

        if (type === 'toast') {
            store.dispatch('flashToast/addToast', data);
        } else {
            store.dispatch('flashToast/addFlash', data);
        }
    }
}

export default new FlashToast();
