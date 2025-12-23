import { RouterProvider } from "react-router/dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { store } from "./store/store";
import { Provider } from 'react-redux';
import router from "./pages/Routes";

import './App.css';

const App = () => {
  return (<ErrorBoundary fallback={ <p>There is a problem rendering the App. Please reload and try again.</p> }>
     <Provider store={store}>
      <RouterProvider router={ router } />
    </Provider>
  </ErrorBoundary>)
}

export default App
