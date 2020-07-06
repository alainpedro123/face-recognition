import React from 'react';
import Tilt from 'react-tilt';
import brain from '../assets/brain.png';

const Logo = () => {
    return (
        <div className="logo">
            <Tilt className="Tilt" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"><img alt='logo' src={brain} /></div>
            </Tilt>
        </div>
    )
}

export default Logo;