import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";


export const Header = ({startLogout}) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__link" to="/dashboard">
                    <p className="header__item">Expensify</p>
                </Link>
                
                <button className="buttons buttons--link" onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout : () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);