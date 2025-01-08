import XsrfHeader from "./Helper/xsrfHeader";
import axios from "axios";
window.axios = axios;
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept':'application/json'
};

let xsrfHeader = new XsrfHeader();
xsrfHeader.setDefaultHeader();

window.Ladda = require('ladda');
window.select2 = require('select2/dist/js/select2.full.min');
import * as CookieHelper from './Helper/Cookie';
const viewCollapsed = CookieHelper.read('viewCollapsed');

$(document).ready(function() {
    "use strict";

    let $body = $('body'),
        menu = document.querySelector('.action-toggle-class[data-class="collapsed-menu"]')
    ;

    $('select').not('[data-type*="vue-select"],.init-select2').select2();

    if(menu) {
        if (viewCollapsed === 'true') {
            document.body.classList.add('collapsed-menu');
            menu.classList.add('collapsed-menu');
        }
        new MutationObserver(m => {
            for(let mutation of m) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    CookieHelper.create(
                        'viewCollapsed',
                        document.body.classList.contains('collapsed-menu').toString(),
                        15
                    )
                }
            }
        }).observe(document.body, {"attributes": true});
    }

    $body.popover({ selector: '[data-toggle="popover"]', trigger: 'hover', html: true });
    $body.tooltip({ selector: '[data-toggle="tooltip"]', container: 'body'});

    const activateTab = function activateTab() {
        let tabs = this.closest('.tabs');
        if (!this.classList.contains('disabled')) {
            tabs.querySelectorAll('[data-target^="tab"]').forEach(el => {
                el.classList.remove('active');
            });
            tabs.querySelectorAll('[data-name^="tab"]').forEach(el => {
                el.classList.add('hidden');
            });
            tabs.querySelector('[data-target="' + this.dataset.target + '"]').classList.add('active');
            tabs.querySelector('[data-name="' + this.dataset.target + '"]').classList.remove('hidden');
        }
    };

    let hash = window.location.hash.substr(1);
    if (hash) {
        let selector = '[data-target="' + hash + '"]', tab;
        if (hash.indexOf('.') > -1) {
            selector = '#' + hash.split('.').shift() + '.tabs [data-target="' + hash.split('.').pop() + '"]';
        }
        tab = document.querySelector(selector);
        if (tab) activateTab.call(tab);
    }

    document.querySelectorAll('.tabs [data-target^="tab"]').forEach(tab => {
        tab.addEventListener('click', activateTab.bind(tab));
    });

    document.querySelectorAll('#main-sidebar a').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('*[data-name="body"]').forEach(b => b.classList.remove('open-menu'));
            document.querySelectorAll('*[data-target="body"').forEach(b => b.classList.remove('open-menu'));
        });
    });

    // dropdown toggle
    document.querySelectorAll('.action-toggle-dropdown').forEach(btn => {

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let checkFocusOut, target = document.querySelector('*[data-name="' + this.dataset.target + '"]');
            this.classList.add(this.dataset.class);
            target.classList.add(this.dataset.class);
            target.focus();
            target.addEventListener('focusout', checkFocusOut = function () {
                if(!target.matches(":hover")) {
                    target.classList.remove(this.dataset.class);
                    this.classList.remove(this.dataset.class);
                    target.removeEventListener('focusout', checkFocusOut);
                } else {
                    target.focus();
                }
            }.bind(this));
        }.bind(btn));
    });

    // close box toggle
    document.querySelectorAll('.action-close-box').forEach(btn => {

        let p = btn.closest('.box,.box-border,.box-shadow'),
            eventName = btn.dataset.interceptBefore || 'click'
        ;

        p.classList.add('transition-close-box');
        p.addEventListener('transitionend', (e) => {
            e.stopPropagation();
            p.style.display = 'none'
        });
        btn.addEventListener(eventName, e => {
            e.stopPropagation();
            if (btn.dataset.transitionDuration) {
                p.style.transitionDuration = btn.dataset.transitionDuration + 'ms';
            } else {
                p.style.transitionDuration = '';
            }
            p.classList.add('transition-start');
            p.style.maxHeight = p.offsetHeight + 'px';
            requestAnimationFrame(() => p.style.maxHeight = 0);
        });
    });

    // class toggler
    document.querySelectorAll('.action-toggle-class').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            if(btn.dataset.targetOnly) {
                btn.classList.toggle(btn.dataset.class);
            }
            document.querySelector('*[data-name="' + btn.dataset.target + '"]').classList.toggle(btn.dataset.class);
        })
    });

    // slidetoggle
    document.querySelectorAll('.action-slideToggle').forEach(btn => {

        let b = document.querySelector('*[data-name="' + btn.dataset.target + '"]'), af = null;
        b.classList.add('transition-close-box');
        b.dataset.display = b.style.display;
        b.dataset.maxHeight = '0';

        if (b.classList.contains('hidden')) {
            let curPos = b.style.position, curLeft = b.style.left;
            b.style.position = 'absolute';
            b.style.left = '-10000px';
            b.classList.remove('hidden');
            b.dataset.maxHeight = b.offsetHeight;
            requestAnimationFrame(() => {
                b.style.display = 'none';
                b.style.position = curPos;
                b.style.left = curLeft;
            });
            btn.classList.add('box-closed');
        }

        b.addEventListener('transitionend', (e) => {
            e.stopPropagation();
            if (parseInt(b.dataset.maxHeight, 10) > 0) {
                b.style.display = 'none';
                btn.classList.add('box-closed');
            } else {
                btn.classList.remove('box-closed');
            }
            btn.classList.remove('transition-open', 'transition-close');
            b.style.maxHeight = '';
            b.classList.remove('transition-start');
            af = null;
        });

        btn.addEventListener('click', function (e) {
            let maxHeight = b.dataset.maxHeight;
            e.stopPropagation();
            if (!af) {
                af = requestAnimationFrame(() => {
                    if (btn.dataset.transitionDuration) {
                        b.style.transitionDuration = btn.dataset.transitionDuration + 'ms';
                    } else {
                        b.style.transitionDuration = '';
                    }
                    b.dataset.maxHeight = b.offsetHeight;
                    b.classList.add('transition-start');
                    btn.classList.add(b.offsetHeight === 0 ? 'transition-open' : 'transition-close');
                    b.style.maxHeight = b.offsetHeight + 'px';
                    b.style.display = b.dataset.display ? b.dataset.display : '';
                    af = requestAnimationFrame(() => { b.style.maxHeight = maxHeight + 'px';});
                });
            }
        })
    });
});
