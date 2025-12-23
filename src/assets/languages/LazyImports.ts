import type { BackendModule } from 'i18next';

const LazyImportPlugin: BackendModule = {
  type: 'backend',
  init: function () { },
  read: function (language, namespace, callback) {
    import(/* webpackChunkName: "i18n/[request]" */ `./${language.substring(0,2)}/${namespace}.json`).then(
      (obj) => {
        callback(null, obj);
      }
    );
  }
};

export default LazyImportPlugin;