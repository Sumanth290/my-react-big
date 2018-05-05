import React from "react";
import {Link} from "react-router-dom";

const ErrorPage = () => (
    <div>
        <h2>404! No Page Found</h2>
        <Link to="/">Go Home</Link>
    </div>
);

export default ErrorPage;