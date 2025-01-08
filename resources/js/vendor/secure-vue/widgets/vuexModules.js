/**
 * vuex modules container
 *
 * import this file and add vuex modules
 * exported object will be injected as vuex modules
 */
export default {

    /**
     * @typedef {{}} FlashMessage
     * @property {Boolean} isFlash
     * @property {Boolean} isToast
     * @property {Boolean} hidden
     * @property {Boolean} paused
     * @property {Boolean} important
     * @property {String} title
     * @property {String} message
     * @property {String} level error|info|success|warning
     * @property {Number} key
     * @property {Number} timeout
     */

    "flashToast": {
        namespaced: true,
        state: {
            messages: [],
            key: 0,
            timeout: 10000
        },
        mutations: {
            /**
             * remove item
             * @param state
             * @param {Number} index
             */
            remove: (state, index) => {
                state.messages.splice(index, 1);
            },

            /**
             * add item
             * @param state
             * @param {FlashMessage} message
             */
            add: (state, message) => {
                state.messages.unshift(message)
            },
            /**
             * set timeout duration
             * @param state
             * @param timeout
             */
            timeout: (state, timeout) => state.timeout = timeout,
        },
        getters: {},
        actions: {

            /**
             * add flash message
             * @param dispatch
             * @param {FlashMessage} message
             */
            addFlash({dispatch}, message) {
                message.isFlash = true;
                dispatch('add', message);
            },

            /**
             * add toast message
             * @param dispatch
             * @param {FlashMessage} message
             */
            addToast({dispatch}, message) {
                message.isToast = true;
                dispatch('add', message);
            },

            /**
             * clear message
             * @param commit
             * @param state
             * @param dispatch
             * @param {{}} data
             */
            add({commit, state, dispatch}, data) {
                let message = {...data, "key": state.key++, "paused": false};
                if ("string" === typeof message.important) {
                    message.important = message.important === 'true';
                }

                if (!message.important) {
                    dispatch('addTimeout', message);
                }
                commit('add', message);
            },

            /**
             * add timeout
             * @param dispatch
             * @param state
             * @param {FlashMessage} message
             */
            addTimeout({dispatch, state}, message) {
                message.timeout = setTimeout(function () {
                    dispatch('hide', message);
                }, state.timeout)
            },

            /**
             * clear timeout
             * @param {FlashMessage} message
             */
            deleteTimeout({}, message) {
                if (message.timeout) {
                    clearTimeout(message.timeout);
                }
            },

            /**
             * toggle timeout
             * @param dispatch
             * @param {FlashMessage} message
             */
            togglePause({dispatch}, message) {
                message.paused = !message.paused;
                if (message.paused) {
                    dispatch('deleteTimeout', message);
                } else {
                    dispatch('addTimeout', message);
                }
            },

            /**
             * add hidden attribute to message
             * @param state
             * @param dispatch
             * @param {FlashMessage} message
             */
            hide({state, dispatch}, message) {
                let index = state.messages.findIndex(m => m.key === message.key);
                message = state.messages[index];
                message.hidden = true;
                dispatch('deleteTimeout', message);
                state.messages.splice(index, 1, message);
            },

            /**
             * prepare for deletion and commit
             * @param commit
             * @param state
             * @param dispatch
             * @param {Number} key
             */
            remove({commit, state, dispatch}, key) {
                let index = state.messages.findIndex(m => m.key === key);
                dispatch('deleteTimeout', state.messages[index]);
                if (index > -1 && state.messages[index].hidden) {
                    commit('remove', index);
                }
            }
        }
    }
};
