import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import route from '../routes'

export default function HomePage () {
	document.title='Shopping Cart | Home'
	const navigate = useNavigate()

	function handleClick () {
		navigate(route.PRODUCTS)
	}

	return (
		<>
			<Header />
			<section className='Home'>
				<div onClick={handleClick} className="title">
					<h1>Join us on an adventure to the skies!</h1>
				</div>
				<img className='landscape' src="/shopping-cart/home-desktop.jpg" alt="Hot air baloons background" />
				<img className='portrait' src="/shopping-cart/home-mobile.jpg" alt="Hot air baloons background" />
			</section>
		</>
	)
}
