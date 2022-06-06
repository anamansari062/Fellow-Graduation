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
              <NavLink to="/" className='navbar-logo'>
                MLH Grads
                <i class='fab fa-typo3' />
              </NavLink>
              <div className='menu-icon'>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <NavLink to="/"exact className='nav-links'>
                    Home
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    to="/buy"
                    className='nav-links'
                    
                  >
                    Buy
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    to="/upload"
                    className='nav-links'
                    
                  >
                    Upload
                  </NavLink>
                </li>
    
                <li>
                  <NavLink
                    to="/help"
                    className='nav-links'
          
                  >
                    Help
                  </NavLink>
                </li>
              </ul>
        
            </div>
          </nav>
        </>
      );
}