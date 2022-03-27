/** Core packages */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer }  from 'react-toastify';

/** Global CSS, JS and packages */
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

/** App component */
import App from './components/App/App';

/** Redux */
import store from './redux/store';
import {Provider} from 'react-redux';

/** Rendere */
ReactDOM.render(
	// <BrowserRouter basename='/reapp'> // enable this for
	<BrowserRouter>
		<Provider store={store}>
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
		</Provider>
  	</BrowserRouter>,
	document.getElementById('root')
);
