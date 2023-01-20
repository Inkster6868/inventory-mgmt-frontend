import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>     {/* provider is the toolkit component provided which will help to give states of the application to react,we generally write it on the top of the heirarchy, i.e wrap everything inside it , this 'store' will be having access to all the reducers through the store.js file */}
  <App />
  </Provider>
    
  </React.StrictMode>
);

