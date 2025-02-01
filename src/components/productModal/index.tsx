import React from 'react';
import Modal from '../modal';
import { Product } from '../productList';
import './styles.css';

type ProductModalProps = {
	onClose: () => void;
	product: Product;
};

export default function ProductModal(props: ProductModalProps) {
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState('');

	const onBuy = async (id: string) => {
		try {
			const response = await fetch(`/api/product/buy/${id}`, {
				method: 'POST',
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}

			props.onClose();
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal close={() => props.onClose()} isLoading={isLoading}>
			{error && <div>{error}</div>}
			<div className='product'>
				<img src={props.product.thumbnail} alt={props.product.description} />
				<h3>{props.product.title}</h3>
				<div className='product-container'>
					<h4>{props.product.description}</h4>
					<p>${props.product.price}</p>
				</div>
				<button onClick={() => onBuy(props.product.id)}>Buy</button>
			</div>
		</Modal>
	);
}
