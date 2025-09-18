export const formatearDinero = (cantidad) => {
	return cantidad.toLocaleString('es', {
		style: 'currency',
		currency: 'EUR',
	});
};

