import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import Header from './components/header/header.component';
import Dashboard from './pages/dashboard/dashboard';
import PedidoDetalles from './pages/pedido-detalles/pedido-detalles.page';
import UsuarioAuth from './pages/usuario-auth/usuario-auth.component';
// import UserAuthContext from './contexts/user-auth/user-auth';

function App() {
	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/usuarios' component={UsuarioAuth} />
				<Route exact path='/pedidos' component={Dashboard} />
				<Route path='/pedidos/:pedido_id' component={PedidoDetalles} />
			</Switch>
		</div>
	);
}

export default App;
