import { useCart } from './Context'

export default function RemoveButton ({ itemId, onRemove }) {
	const cart = useCart()

	function handleRemoveItem () {
		cart.updateItem(itemId, 0)
		onRemove && onRemove()
	}

	return (
		<button className='RemoveButton' onClick={handleRemoveItem}>
			<span>Remove</span>
			<img src="/shopping-cart/remove-from-cart.png" alt={'Remove item from cart'} />
		</button>
	)
}
