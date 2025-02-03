import React from 'react';
import Modal from '../modal';
import { Product } from '../productList';
import './styles.css';

type ProductModalProps = {
	onClose: () => void;
	product: Product;
	baseUrl: string;
};

type Order = {
	id: string;
	customer: string;
	deliveryCEP: string;
	productId: string;
	quantity: number;
	total: number;
};

export default function ProductModal(props: ProductModalProps) {
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [customerName, setCustomerName] = React.useState('');
	const [cep, setCep] = React.useState('');
	const [quantity, setQuantity] = React.useState(1);

	const onBuy = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			const order: Partial<Order> = {
				customer: customerName,
				deliveryCEP: cep,
				productId: props.product.id,
				quantity: quantity,
				total: props.product.price * quantity,
			};

			const response = await fetch(`${props.baseUrl}/order`, {
				method: 'POST',
				body: JSON.stringify(order),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			} else {
				if (response.status === 201 || response.status === 200) {
					alert('Pedido realizado com sucesso!');
				} else if (data.message) {
					throw new Error('Erro ao criar pedido! ' + data.message);
				} else {
					throw new Error('Erro desconhecido ao criar pedido!');
				}
			}

			props.onClose();
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			close={() => props.onClose()}
			isLoading={isLoading}
			className='product-modal'
		>
			<form className='product' onSubmit={e => onBuy(e)}>
				<img src={props.product.thumbnail} alt={props.product.description} />
				<h3>{props.product.title}</h3>
				<p>{props.product.description}</p>
				<p>${props.product.price}</p>
				<label>Seu nome:</label>
				<input
					name='customerName'
					value={customerName}
					onChange={e => setCustomerName(e.target.value)}
				/>
				<label>CEP:</label>
				<input name='cep' value={cep} onChange={e => setCep(e.target.value)} />
				<label>Quantidade:</label>
				<input
					name='quantity'
					type='number'
					value={quantity}
					onChange={e => setQuantity(parseInt(e.target.value))}
				/>
				<button type='submit'>Confirmar</button>
			</form>
			{error && <div>{error}</div>}
		</Modal>
	);
}
