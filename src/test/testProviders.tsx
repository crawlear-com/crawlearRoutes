import i18n from "@/i18n";
import type { EnhancedStore } from "@reduxjs/toolkit";
import type { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { HashRouter } from "react-router";

type WrapperProps = PropsWithChildren<{
  store: EnhancedStore;
}>;

const testI18n = i18n.createInstance();
testI18n.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      myEvents: {
        "errors.error loading routes": "Error loading routes",
        "errors.error loading events": "Error loading events",
        "main.only route events drop": "Only route events can be moved",
        "main.event modified": "Event modified",
      },
    },
  },
  interpolation: { escapeValue: false },
});

const AllProviders = ({ children, store }: WrapperProps) => (
  <Provider store={store}>
    <I18nextProvider i18n={ testI18n }>
      <HashRouter>
        <Toaster />
        {children}
      </HashRouter>
    </I18nextProvider>
  </Provider>
);

export { AllProviders };