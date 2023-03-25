import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function HomePage () {
	const navigate = useNavigate()

	function handleClick () {
		navigate('/products')
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
