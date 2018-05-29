import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {startLogout} from "../actions/auth";


export const Header = ({startLogout}) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__link" to="/dashboard">
                    <div className="header__item">
                        <p>Expensify</p>
                    </div>
                </Link>
                
                <button className="buttons buttons--link" onClick={startLogout}>Log out</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout : () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);