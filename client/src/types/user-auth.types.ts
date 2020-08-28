export interface UsuarioDB {
	admin: boolean;
	email: string;
	nombre: string;
	pedidos_id: string[];
	telefono: string;
	_id: string;
}

interface AuthStatus {
	autenticado: boolean;
	admin: boolean;
	setUsuario?: Function;
}

export type UsuarioState = (UsuarioDB & AuthStatus) | AuthStatus;
