import { trans, trans_choice} from '../lang';

export default {
  install: (app, options) => {
    app.config.globalProperties.trans = trans;
    app.config.globalProperties.$t = trans;
    app.config.globalProperties.$tm = trans;
    app.config.globalProperties.trans_choice = trans_choice;
  },
};
