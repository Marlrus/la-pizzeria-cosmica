import React from 'react';

import './tabla-detalles.styles.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface TablaDetallesProps extends RouteComponentProps {
	pedidos: any[];
	cabezeras: string[];
	orden: string[];
}

const TablaDetalles: React.FC<TablaDetallesProps> = ({
	pedidos,
	cabezeras,
	orden,
	match,
	history,
}) => {
	return (
		<div className='contenedor-table'>
			<table>
				<thead>
					<tr>
						{cabezeras.map((cabezera, i) => (
							<th key={i}>{cabezera}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{pedidos.map((pedido: any) => (
						<tr
							key={pedido._id}
							onClick={() => history.push(`${match.url}/${pedido._id}`)}
						>
							{orden.map(key => (
								<td key={key}>{pedido[key] ? pedido[key] : null}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default withRouter(TablaDetalles);
