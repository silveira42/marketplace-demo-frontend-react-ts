import React from 'react';
import './App.css';
import ProductList from './components/productList';

function App() {
	return (
		<div className='App'>
			<ProductList
				theme='dark'
				url='http://irisdemo:52773/api/v1/product'
				limit={20}
			/>
		</div>
	);
}

export default App;
