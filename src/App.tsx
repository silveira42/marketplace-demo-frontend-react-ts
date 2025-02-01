import React from 'react';
import './App.css';
import ProductList from './components/productList';

function App() {
	return (
		<div className='App'>
			<ProductList
				theme='dark'
				url='https://dummyjson.com/products'
				limit={20}
			/>
		</div>
	);
}

export default App;
