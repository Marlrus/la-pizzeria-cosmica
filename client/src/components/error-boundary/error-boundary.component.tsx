import React, { ErrorInfo } from 'react';

import './error-boundary.styles.scss';

interface ErrorBoundaryState {
	hasErrored: boolean;
	errMessage?: string;
}

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
	constructor(props: any) {
		super(props);

		this.state = {
			hasErrored: false,
		};
	}

	static getDerivedStateFromError(err: Error) {
		//process err
		return { hasErrored: true, errMessage: err.message };
	}

	componentDidCatch(err: Error, errInfo: ErrorInfo) {
		console.log(err, errInfo);
	}

	render() {
		const { errMessage } = this.state;
		return this.state.hasErrored ? (
			<div className='overlay-imagen'>
				<img
					className='contenedor-imagen-error'
					src='https://i.imgur.com/yW2W9SC.png'
				/>
				<h2 className='texto-error-imagen'>
					Disculapnos! Un error sucedio con la pagina.
					<br />
					{errMessage ? <span>Error: {errMessage}</span> : null}
				</h2>
			</div>
		) : (
			this.props.children
		);
	}
}

export default ErrorBoundary;
