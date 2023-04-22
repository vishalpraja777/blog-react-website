import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>404 Page Not Found</h2>
            <p>The requested page cannot be found</p>
            <Link to='/'>Back to the homepage...</Link>
        </div>
     );
}
 
export default NotFound;