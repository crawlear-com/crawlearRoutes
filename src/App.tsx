import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { Toaster } from 'react-hot-toast';
import MainHashRouter from "@/components/MainHashRouter/MainHashRouter";
import useOffline from "./features/offline/hooks/useOffline";

import '@/styles/App.css';

const App = () => {
  useOffline();

  return (<ErrorBoundary fallback={ <p>There is a problem rendering the App. Please reload and try again.</p> }>
      <div><Toaster /></div>
      <MainHashRouter />
  </ErrorBoundary>)
}

export default App
