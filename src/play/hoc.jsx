import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is : {props.info}</p>
    </div>
);

const getAdminInfoComponent = (WrappedComponent)=>{
    return (props) => (
        (props.isAdmin && 
        <div>
            <p> This is a private Info. Please don't share!</p>
            <WrappedComponent {...props}/>
        </div>
        )
    );
};

// Just testing some stuff

const requireAuthentication = (WrappedComponent)=>{
    return (props) => (
        (props.isAuthenticated ?(
            <div>
                <p> This is a private Info. Please don't share!</p>
                <WrappedComponent {...props}/>
            </div>
            ) :
            (
                <h1>Please login to view info</h1>
            )
        )
    );
};

const AdminInfo = getAdminInfoComponent(Info);

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details"/>,document.getElementById("app"));