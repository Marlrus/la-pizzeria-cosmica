import { createContext } from 'react';
import { UsuarioState } from '../../types/user-auth.types';

const UserAuthContext = createContext<UsuarioState>({
	autenticado: false,
	admin: false,
});

export default UserAuthContext;
