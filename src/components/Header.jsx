import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";


export const Header = ({startLogout}) => (
    <header className="header">
        <div className="content-container">
            <Link className="header__link" to="/dashboard">
                <div className="header__item">
                    <h1>Expensify</h1>
                </div>
            </Link>
            
            <button onClick={startLogout}>Logout</button>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout : () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);