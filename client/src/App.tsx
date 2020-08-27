import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import Header from './components/header/header.component';
import Dashboard from './pages/dashboard/dashboard';

function App() {
	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/dashboard' component={Dashboard} />
			</Switch>
		</div>
	);
}

export default App;
