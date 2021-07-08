/** Core packages */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

/** Global CSS, JS and packages */
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

/** App component */
import App from './components/App/App';

/** Rendere */
ReactDOM.render(
	<BrowserRouter basename='/reapp'>
    	<App />
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
		<ToastContainer />
  	</BrowserRouter>,
	document.getElementById('root')
);
