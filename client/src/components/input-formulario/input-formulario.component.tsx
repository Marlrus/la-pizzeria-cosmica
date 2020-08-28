import React from 'react';

import './input-formulario.styles.scss';

interface InputProps {
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	name: string;
	type: string;
	value: string;
	required: boolean;
}

const InputFormulario: React.FC<InputProps> = ({
	handleChange,
	label,
	...otrosProps
}) => {
	return (
		<div className='contenedor-input'>
			<input className='input' onChange={handleChange} {...otrosProps} />
			{label ? (
				<label className={otrosProps.value.length ? 'encoger' : ''}>
					{label}
				</label>
			) : null}
		</div>
	);
};

export default InputFormulario;
