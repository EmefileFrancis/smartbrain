import React from 'react'

const Navigation = ({ onRouteChange }) => {
    return(
        <nav style={{float: 'right', width: '150px'}}>
            <p onClick= { () => onRouteChange('signin') } className='f3 link dim underline p3 pointer'>Sign out</p>
        </nav>
    );
}

export default Navigation;