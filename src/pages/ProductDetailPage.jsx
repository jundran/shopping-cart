import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../product-data'
import { useCart } from '../components/Context'
import Header from '../components/Header'
import QuantityWidget from '../components/QuantityWidget'
import RemoveButton from '../components/RemoveButton'
import routes from '../routes'
import NotFound from './404'

export default function ProductDetailPage () {
	const productId = useParams().id
	return (
		<>
			<Header />
			<ProductDetail id={productId} />
		</>
	)
}

function ProductDetail ({ id }) {
	const data = products.find(product => product.id === id)
	if (!data) return <NotFound />

	document.title='Shopping Cart | Products | ' + data.name
	return (
		<section className='ProductDetail'>
			<h1>{data.name}</h1>
			<div className="main">
				<img
					className='product-image'
					src={data.source}
					alt={data.name}
				/>
				<div className="info">
					<p className='price'>${data.price}</p>
					<p>{data.description}</p>
				</div>
				<ManageItem data={data}/>
				<ReturnLink />
			</div>
		</section>
	)
}

function ReturnLink () {
	return (
		<div className='ReturnLink'>
			<Link to={routes.PRODUCTS}><span>← </span>Browse more items</Link>
		</div>
	)
}

function ManageItem ({ data }) {
	const [quantityWidgetKey, setQuantityWidgetKey] = useState(data.id)
	const cart = useCart()
	const itemInCart = cart.findItem(data.id)
	const status = itemInCart ? `There ${itemInCart.quantity > 1 ? 'are ' : 'is '}` +
		`${itemInCart.quantity} of this item in your cart.` : ''

	function handleItemDeleted () {
		// Needed to make QuantityWidget reset so input value is 1
		// and not whatever it was before the item was deleted
		setQuantityWidgetKey(self.crypto.randomUUID())
	}

	return (
		<div className="ManageItem">
			<QuantityWidget
				key={quantityWidgetKey}
				item={data} itemInCart={itemInCart}
			/>
			<p>{status}</p>
			{itemInCart &&<RemoveButton itemId={data.id} onRemove={handleItemDeleted} />}

		</div>
	)
}
