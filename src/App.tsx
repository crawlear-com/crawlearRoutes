import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import MainHashRouter from "./components/MainHashRouter/MainHashRouter";

import './styles/App.css';

const App = () => {
  return (<ErrorBoundary fallback={ <p>There is a problem rendering the App. Please reload and try again.</p> }>
     <Provider store={store}>
      <div><Toaster /></div>
      <MainHashRouter />
    </Provider>
  </ErrorBoundary>)
}

export default App
