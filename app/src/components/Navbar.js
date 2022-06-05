import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from './Button';
import './Navbar.css';

export default function NavBar() {

    const [click, setClick] = useState(false);
  // const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // const showButton = () => {
  //   if (window.innerWidth <= 960) {
  //     setButton(false);
  //   } else {
  //     setButton(true);
  //   }
  // };

  // useEffect(() => {
  //   showButton();
  // }, []);

  // window.addEventListener('resize', showButton);

    // 
    
    return (
        <>
          <nav className='navbar'>
            <div className='navbar-container'>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                MLH Grads
                <i class='fab fa-typo3' />
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/buy'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Buy
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/upload'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Upload
                  </Link>
                </li>
    
                <li>
                  <Link
                    to='/help'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Help
                  </Link>
                </li>
              </ul>
        
            </div>
          </nav>
        </>
      );
}