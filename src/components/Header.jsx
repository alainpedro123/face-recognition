import React from 'react';

const Header = ({ changingRoute, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="navigation">
                <p onClick={() => changingRoute('signout')}>Sign Out</p>
            </nav>
        )
    } else {
        return (
            <div>
                <nav className="navigation">
                    <p onClick={() => changingRoute('signin')}>Sign In</p>
                    <p onClick={() => changingRoute('register')}>Register</p>
                </nav>
            </div>
        )
    }
}

export default Header;