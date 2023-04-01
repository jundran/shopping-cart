import { Link } from 'react-router-dom'
import products from '../product-data'
import { useCart } from './Context'
import QuantityWidget from './QuantityWidget'
import RemoveButton from './RemoveButton'
import routes from '../routes'

export default function Orders () {
	const cart = useCart()
	// Sort alphabetically to keep order the same when updating quantity
	const sortedItems = [...cart.items].sort((a, b) => {
		const productA = products.find(p => p.id === a.id )
		const productB = products.find(p => p.id === b.id )
		return productA.name.toLowerCase() < productB.name.toLowerCase() ? -1 : 1
	})

	return (
		<section className="Orders">
			<h2>Orders</h2>
			{sortedItems.map(item => <ProductSummary key={item.id} item={item} />)}
		</section>
	)
}

function ProductSummary ({ item }) {
	const { id, quantity } = item
	const product = products.find(p => p.id === id)
	return (
		<div className='ProductSummary'>
			<ul>
				<li className='title'>
					<p><Link to={`${routes.PRODUCT_DETAIL}/${item.id}`}>{product.name}</Link></p>
				</li>
				<li className='price'>
					<span>Price (each)</span>
					<span>${product.price}</span>
				</li>
				<li className='quantity'>
					<span>Quantity</span>
					<QuantityWidget item={item} />
				</li>
				<li className='total'>
					<span>Item total</span>
					<span>${product.price * quantity}</span>
				</li>
				<li className='remove'>
					<RemoveButton itemId={item.id} />
				</li>
			</ul>
		</div>
	)
}
