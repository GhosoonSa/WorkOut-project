import React from 'react';
import './App.css';

function Navbar() {
    return (
      <>      
    <section className='section-0'> 
      <nav className='navbar navbar-expand-lg '>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>WORKOUT LAND</a>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item dropdown'>
                <button type='button' className='btn dropdown-toggle' id='navbarDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
                   Setting
                </button>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li className='dropdown-item'>Mode</li>
                <li><a className='dropdown-item' href='/'>Log Out</a></li>
              </ul>
              </li>
           </ul>
         </div>
       </div>
     </nav>
    </section>

      </>
      );}
export default Navbar;   