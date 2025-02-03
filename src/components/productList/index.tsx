/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './styles.css';
import ProductModal from '../productModal';

interface ProductListProps {
	theme: string;
	url: string;
	limit?: number;
}

export interface Product {
	id: string;
	title: string;
	price: number;
	description: string;
	thumbnail: string;
}

interface FetchProductsResponse {
	products: Product[];
	total: number;
}

export default function ProductList({
	theme,
	url,
	limit = 20,
}: ProductListProps) {
	const [products, setProducts] = React.useState<Product[]>([]);
	const [skip, setSkip] = React.useState(0);
	const [loading, setLoading] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
	const [loadButtonEnabled, setLoadButtonEnabled] = React.useState(true);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
		null
	);

	function handleLoadMore() {
		setSkip(skip + limit);
	}

	async function fetchProducts(url: string, skip: number, limit: number) {
		try {
			setLoading(true);

			const response = await fetch(
				`${url}/product?limit=${limit}&skip=${skip}`
			);

			const data: FetchProductsResponse = await response.json();

			if (!data) {
				throw new Error('Server error. No data found.');
			}

			if (!data.products || !data.products.length) {
				throw new Error('Server error. No data found.');
			}

			const newProducts = data.products;

			let cpyProducts = [...products];
			cpyProducts.push(...newProducts);

			if (cpyProducts.length >= data.total) {
				setLoadButtonEnabled(false);
			}

			setProducts(cpyProducts);
			setLoading(false);
		} catch (exception: any) {
			setErrorMessage(exception.message);
			setLoading(false);
		}
	}

	const selectProduct = (product: Product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	React.useEffect(() => {
		if (url !== '') fetchProducts(url, skip, limit);
	}, [skip]);

	if (errorMessage !== null) {
		return (
			<div className='load-container'>
				<h3 className='error'>Error. Please reload the page.</h3>
				<p className='error'>Details: {errorMessage}</p>
			</div>
		);
	}

	return (
		<div className='load-more-wrapper' data-theme={theme}>
			<div className='load-more-product-list'>
				{products && products.length
					? products.map((product, index) => (
							<div key={index} className='load-more-product'>
								<img src={product.thumbnail} alt={product.description} />
								<h3>{product.title}</h3>
								<p>{product.description}</p>
								<h2>R${product.price}</h2>
								<button
									onClick={() => {
										selectProduct(product);
									}}
								>
									Buy
								</button>
							</div>
					  ))
					: null}
			</div>
			{loading ? (
				<div className='load-container'>
					<h3 className='loading'>Loading... Please wait</h3>
				</div>
			) : null}
			{loadButtonEnabled ? (
				<button className='load-more-button' onClick={handleLoadMore}>
					Load more data
				</button>
			) : null}
			{isModalOpen && selectedProduct ? (
				<ProductModal
					product={selectedProduct}
					onClose={() => setIsModalOpen(false)}
					baseUrl={url}
				/>
			) : null}
		</div>
	);
}
