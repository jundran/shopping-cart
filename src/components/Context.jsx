import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export default function CartProvider ({ children }) {
	const [items, setItems] = useState([])

	function clearCart () {
		setItems([])
	}

	function findItem (id) {
		return items.find(item => item.id ===id)
	}

	function updateItem (id, quantity) {
		if (quantity === 0) return setItems(items.filter(item => item.id !== id))

		const updatedItem = {
			id,
			quantity
		}

		const newItems = items.filter(item => item.id !== id)
		newItems.push(updatedItem)
		setItems(newItems)
	}

	return (
		<CartContext.Provider value={{
			items,
			updateItem,
			findItem,
			clearCart
		}}>
			{children}
		</CartContext.Provider>
	)
}

export function useCart () {
	return useContext(CartContext)
}
