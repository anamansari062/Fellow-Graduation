import React, {useState} from "react";
import { NavLink } from "react-router-dom";

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
              <a href="/" className='navbar-logo'>
                MLH Grads
                <i className='fab fa-typo3' />
              </a>
              <div className='menu-icon'>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <a href="/" className='nav-links'>
                    Home
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href="/buy"
                    className='nav-links'
                    
                  >
                    Buy
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href="/upload"
                    className='nav-links'
                    
                  >
                    Upload
                  </a>
                </li>
    
                <li>
                  <a
                    href="/help"
                    className='nav-links'
          
                  >
                    Help
                  </a>
                </li>
              </ul>
        
            </div>
          </nav>
        </>
      );
}