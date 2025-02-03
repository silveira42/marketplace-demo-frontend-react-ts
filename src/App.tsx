import React from 'react';
import './App.css';
import ProductList from './components/productList';

function App() {
	return (
		<div className='App' data-theme='dark'>
			<h1>Marketplace</h1>
			<ProductList
				theme='dark'
				url='https://irisdemo.thesilver.com.br/api/v1'
				limit={20}
			/>
		</div>
	);
}

export default App;
