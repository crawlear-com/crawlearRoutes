import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from "@/application/store/store";
import App from '@/App.tsx';
import '@/i18n';

import '@/application/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
      
  </StrictMode>,
)
