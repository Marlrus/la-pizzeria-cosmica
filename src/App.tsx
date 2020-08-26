import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import Header from './components/header/header.component';

// import logo from './logo.svg';
/* <img src={logo} className="App-logo" alt="logo" /> */

function App() {
	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/' component={HomePage} />
			</Switch>
		</div>
	);
}

export default App;
