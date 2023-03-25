import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import products from '../product-data'
import routes from '../routes'

export default function ProductsPage () {
	document.title='Shopping Cart | Products'

	return (
		<>
			<Header />
			<Products />
		</>
	)
}

function Products () {
	return (
		<section className="Products">
			<div className="main">
				{products.map(product =>
					<Product key={product.id} data={product} />
				)}
			</div>
		</section>
	)
}

function Product ({ data }) {
	const navigate = useNavigate()

	function handleClick () {
		navigate(`${routes.PRODUCT_DETAIL}/${data.id}`)
	}

	return (
		<div onClick={handleClick} className='Product'>
			<p className='name'>{data.name}</p>
			<img
				className={data.className}
				src={data.source}
				alt={data.name} />
			<div className='info'>
				<span className='price'>${data.price}</span>
			</div>
		</div>
	)
}
