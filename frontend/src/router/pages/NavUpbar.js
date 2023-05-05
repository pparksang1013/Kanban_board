import '../../style/Header.css';
import '../../style/MainPage.css';


import React from 'react';
// import { padding } from '@mui/system';

function NavUpbar() {
    return (
        <div className='NavUpbar'>
            <nav>
            <ul className='hNavUl'>
                <li className='hNav'><a href="#" >File</a></li>
                <li className='hNav'><a href="#" >Edit</a></li>
                <li className='hNav'><a href="#" >View</a></li>
                <li className='hNav'><a href="#" >Help</a></li>
            </ul>
            
            </nav>
            <button className='setBtn'>설정</button>
        </div>
    );
}

export default NavUpbar;