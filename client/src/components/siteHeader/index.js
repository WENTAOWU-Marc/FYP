import React from "react";
import { Link } from "react-router-dom";
import "../../globals/fontawesome";
import "./siteHeader.css";
import "antd/dist/antd.css";
import { useUser, useFirebaseApp } from "reactfire"
import 'firebase/auth';

const SiteHeader = () => {
    const user = useUser();
    const firebaseuser = useFirebaseApp();

    const handleClick = () => {
        firebaseuser.auth().signOut();
        alert("You have successfully signed out")
        window.location.replace("./");
    }

    return (

        <nav className="navbar  navbar-light fixed-top  bg-dark ">
            <nav className="navbar-brand text-white"  >
                <Link className=" text-white" to="/">
                    Home
                </Link>
            </nav>

            <nav className="navbar navbar-expand ">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {user.data ?
                            <Link className="nav-link text-white" to="/userinfo">
                                WellCome,  {user.data.displayName}
                            </Link>
                            :
                            <Link className="nav-link text-white" to="/login">
                                login
                            </Link>
                        }
                    </li>
                    <li className="nav-item">
                        {user.data ? <span className="nav-link text-white" onClick={handleClick}>
                            Logout
                        </span> : ""}
                    </li>
                </ul>
            </nav>
        </nav>
    );
};

export default SiteHeader;