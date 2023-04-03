import { HashRouter, Routes, Route } from 'react-router-dom'
import '../styles/App.sass'
import CartProvider from './Context'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CheckoutPage from '../pages/CheckoutPage'
import routes from '../routes'
import NotFound from '../pages/404'

export default function App () {
	return (
		<CartProvider>
			<HashRouter>
				<Routes>
					<Route path={routes.HOME} element={<HomePage />} />
					<Route path={routes.PRODUCTS} element={<ProductsPage />} />
					<Route path={`${routes.PRODUCT_DETAIL}/:id`} element={<ProductDetailPage />} />
					<Route path={routes.CHECKOUT} element={<CheckoutPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</HashRouter>
		</CartProvider>
	)
}
