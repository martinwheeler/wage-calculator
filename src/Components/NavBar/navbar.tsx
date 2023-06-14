import { Link } from 'react-router-dom'
import BlackLogo from '../../Images/small-bucket-black.png'
import './navbar.scss'

export const NavBar = () => {

    const navigateHome = () => {

    }

    return (
        <>
            <div className='nav-bar'>
                <Link to="/">
                    <div className='logo-container' onClick={() => { navigateHome() }}>
                        <img className='logo' src={BlackLogo} />
                        <h1>Divvy Up</h1>
                    </div>
                </Link>

                <div className='nav-links'>
                    <Link to="/about" className='about-container'>
                        <h2>About</h2>
                    </Link>
                    <Link to="/contact" className='contact-container'>
                        <h2>Contact</h2>
                    </Link>
                </div>
            </div>
        </>
    )
}