import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import Header from './components/header/header.component';
import Dashboard from './pages/dashboard/dashboard';
import PedidoDetalles from './pages/pedido-detalles/pedido-detalles.page';
import UsuarioAuth from './pages/usuario-auth/usuario-auth.component';
import UserAuthContext from './contexts/user-auth/user-auth';

import { UsuarioState } from './types/user-auth.types';

function App() {
	const [usuario, setUsuario] = useState<UsuarioState>({
		autenticado: false,
		admin: false,
	});

	useEffect(() => {
		const localStoragUsuario = localStorage.getItem('usuario-state');
		if (localStoragUsuario) setUsuario(JSON.parse(localStoragUsuario));
	}, []);

	return (
		<div className='App'>
			<UserAuthContext.Provider value={{ ...usuario, setUsuario }}>
				<Header />
			</UserAuthContext.Provider>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<UserAuthContext.Provider value={{ ...usuario, setUsuario }}>
					<Route exact path='/usuarios' component={UsuarioAuth} />
				</UserAuthContext.Provider>
				<Route exact path='/pedidos' component={Dashboard} />
				<Route path='/pedidos/:pedido_id' component={PedidoDetalles} />
			</Switch>
		</div>
	);
}

export default App;
