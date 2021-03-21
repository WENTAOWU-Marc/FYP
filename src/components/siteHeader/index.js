import React from "react";
import { Link } from "react-router-dom";
import "../../globals/fontawesome";
import "./siteHeader.css";
import "antd/dist/antd.css";
import { useUser } from "reactfire"
import 'firebase/auth';

const SiteHeader = () => {
  const user = useUser();
  return (
    
    <nav className="navbar  navbar-light fixed-top  bg-dark ">
      <nav className="navbar-brand text-white"  >
        <Link className=" text-white" to="/">
          RUH
        </Link>
      </nav>

       <nav className="navbar navbar-expand ">
         <ul className="navbar-nav">
           <li className="nav-item">
            <Link className="nav-link text-white" to="/login">
              {user.data ? user.data.displayName : "login"}
            </Link>
           </li>
         </ul>
       </nav>

      {/* <FontAwesomeIcon
        className="navbar-text text-light"
        icon={["fas", "film"]}
        size="3x"
      /> */}

       </nav>
    
    

    
  );
};

export default SiteHeader;