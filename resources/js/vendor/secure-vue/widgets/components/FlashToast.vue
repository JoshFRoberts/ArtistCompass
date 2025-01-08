<template>
    <div id="flash-toast" v-if="messages.length > 0" class="row">
        <content2>
            <div class="flash-messages" v-if="flashMessages.length > 0">
                <transition-group appear name="expand" tag="div" v-on:after-leave="remove">
                    <div v-for="(message) in flashMessages"
                         v-on:click="e => hide(message, e)"
                         :class="['expand-transition', 'notification', 'color-white', 'margin-xs-b', getBackground(message)]"
                         :key="message.key"
                         role="alert"
                         :data-key="message.key"
                    >
                        <i :class="['fas', {'fa-play': message.paused, 'fa-pause': !message.paused}, 'btn-action']" v-on:click.stop="() => togglePause(message)" v-if="!message.important"/>
                        <i class="fas fa-times btn-action" v-on:click.stop="e => hide(message, e)" v-if="message.important"/>
                        <div class="content-2" data-dismiss="modal">
                            <p class="text-h3 color-white">
                                <i :class="['fal', 'fa-fw', getIconClass(message)]"/>
                                <span v-html="message.title ? message.title : message.message"></span>
                            </p>
                            <div v-if="message.title" v-html="message.message"></div>
                        </div>
                    </div>
                </transition-group>
            </div>

            <teleport to="#teleport-target">
                <div class="toast-messages" v-if="toastMessages.length > 0">
                    <transition-group appear name="expand" tag="div" v-on:after-leave="remove">
                        <div v-for="message in toastMessages"
                             v-on:click="e => hide(message, e)"
                             :class="['expand-transition', 'notification', 'color-white', 'margin-xs-b', 'margin-xs-l', getBackground(message)]"
                             :key="message.key"
                             role="alert"
                             :data-key="message.key">
                            <i :class="['fas', {'fa-play': message.paused, 'fa-pause': !message.paused}, 'btn-action']" v-on:click.stop="() => togglePause(message)" v-if="!message.important"/>
                            <i class="fas fa-times btn-action" v-on:click.stop="e => hide(message, e)" v-if="message.important"/>
                            <div class="content-2" data-dismiss="modal">
                                <p class="text-h3 color-white">
                                    <i :class="['fal', 'fa-fw', getIconClass(message)]"/>
                                    <span v-html="message.title ? message.title : message.message"></span>
                                </p>
                                <div v-if="message.title" v-html="message.message"></div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </teleport>
        </content2>
    </div>
</template>

<script>

/**
 * @typedef {{}} message
 * @property {String} [title]
 * @property {String} message
 */

import content2 from "./layout/content2.vue";
import { mapState } from 'vuex';

export default {
    name: "FlashToast",

    props: {
        flash : {
            default: () => ([]),
        },
    },

    components: {
        "content2": content2
    },

    computed: {
        ...mapState('flashToast', ["messages"]),
        toastMessages() {
            return this.messages.filter(m => m.isToast === true && !m.hidden);
        },
        flashMessages() {
            return this.messages.filter(m => m.isFlash === true && !m.hidden);
        },
    },

    mounted() {
        setTimeout(function () {
            this.flash.forEach(this.addMessage.bind(this));
        }.bind(this), 0);
    },

    methods: {

        /**
         * @param {FlashMessage} message
         */
        addFlash(message) {
            message.isFlash = true;
            this.addMessage(message);
        },

        /**
         * @param {FlashMessage} message
         */
        addToast(message) {
            message.isToast = true;
            this.addMessage(message);
        },

        /**
         * @param {FlashMessage} message
         */
        addMessage(message) {
            this.$store.dispatch('flashToast/add', message);
        },

        /**
         * @param {FlashMessage} message
         * @param {MouseEvent} [e]
         * @param {MouseEvent} [e]
         * @param {HTMLElement} e.target
         * @access private
         */
        hide(message, e) {
            if(e.target.tagName.toLowerCase() !== 'a') {
                this.$store.dispatch('flashToast/hide', message);
            }
        },

        /**
         * @param {HTMLElement} node
         * @access private
         */
        remove(node) {
            this.$store.dispatch('flashToast/remove', parseInt(node.dataset.key, 10));
        },

        /**
         * @param {FlashMessage} message
         * @access private
         */
        togglePause(message) {
            this.$store.dispatch('flashToast/togglePause', message);
        },

        /**
         * @param {FlashMessage} message
         * @access private
         */
        getBackground(message) {
            if ("undefined" !== typeof message.level) {
                switch (message.level) {
                    case 'info':
                        return 'bg-blue';
                    case 'success':
                        return 'bg-green';
                    case 'warning':
                        return 'bg-yellow'
                }
            }
            return 'bg-red'
        },

        /**
         * @param {FlashMessage} message
         * @access private
         */
        getIconClass(message) {
            if ("undefined" !== typeof message.level) {
                switch (message.level) {
                    case 'info':
                        return 'fa-envelope';
                    case 'success':
                        return 'fa-check';
                    case 'warning':
                        return 'fa-bell'
                }
            }
            return 'fa-exclamation-triangle'
        },
    }
}
</script>

<style scoped lang="scss">

@import "@sp/sp-sass/sass/settings";

#flash-toast, #teleport-target {

    z-index: 2;

    .box-content-2 {
        padding: 0;
    }

    user-select: none;

    .notification {
        position: relative;
        box-shadow: $boxShadowStyle;
        &:hover {
            box-shadow: $hoverBoxShadowStyle;
        }
        overflow: hidden;

        .btn-action {
            position: absolute;
            top: .5em;
            right: .5em;
        }

        &::v-deep a {
            color: inherit;
            text-decoration: underline;
        }
    }

    .flash-messages {
        .notification:first-child {
            margin-top: $gutterBase * 2;
        }
    }

    .toast-messages {
        position: fixed;
        top: 12px;
        right: 0;
        padding: $gutterBase * 2;
        max-height: 100vh;

        > div {
            display: flex;
            flex-direction: column-reverse;
            flex-wrap: wrap;
            max-height: calc(100vh - #{2 * $gutterBase});
            transform: rotate(180deg);
        }

        .notification {
            width: $sidebarWidth;
            transform: rotate(180deg);
        }
    }

    .expand-transition {
        transition: max-height $transitionSpeed, border-width $transitionSpeed, padding $transitionSpeed;
        max-height: 500px;
    }
    .expand-enter, .expand-leave-to {
        max-height: 0;
        padding: 0;
        border-width: 0;
    }
}
</style>
