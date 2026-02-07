import React, { type PropsWithChildren } from 'react'
import { render, renderHook } from '@testing-library/react'
import type { RenderHookOptions, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import type { AppStore, AppState } from '../store/store'
import { setupStore } from '../store/store';
import rootReducer from '@/store/RootReducer'
import { configureStore, type EnhancedStore } from '@reduxjs/toolkit'
import { AllProviders } from './testProviders'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<AppState>
  store?: AppStore
}

const renderWithProviders = (ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {
  const {
    store = setupStore(),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{ children }</Provider>)

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTestStore = (preloadedState?: any): EnhancedStore =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

const renderHookWithProviders = <T, P>(
  hook: (props: P) => T,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    preloadedState?: any;
    store?: EnhancedStore;
  } & Omit<RenderHookOptions<P>, "wrapper"> = {}
) => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <AllProviders store={store}>{children}</AllProviders>
  );

  return {
    store,
    ...renderHook(hook, { wrapper, ...renderOptions }),
  };
};

export { renderWithProviders, renderHookWithProviders }