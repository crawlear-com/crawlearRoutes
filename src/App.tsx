import ErrorBoundary from "@/application/components/ErrorBoundary/ErrorBoundary";
import { Toaster } from 'react-hot-toast';
import MainHashRouter from "@/application/components/MainHashRouter/MainHashRouter";
import useOffline from "./application/features/offline/hooks/useOffline";

import '@/application/styles/App.css';

const App = () => {
  useOffline();

  return (<ErrorBoundary fallback={ <p>There is a problem rendering the App. Please reload and try again.</p> }>
      <div><Toaster /></div>
      <MainHashRouter />
  </ErrorBoundary>)
}

export default App
