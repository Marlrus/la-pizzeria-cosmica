import { createContext } from 'react';

const UserAuthContext = createContext({
	autenticado: false,
	admin: false,
});

export default UserAuthContext;
