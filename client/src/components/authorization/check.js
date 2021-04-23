import React, { useState } from 'react'
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'

export default function Check () {

    // User State
    const [user, setUser] = useState({
        email: '',
        error: '',
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            error: '',
        })
    };

    const firebase = useFirebaseApp();

    // onChange function
    const handleSubmit = async (e) => {
        e.preventDefault();
        var actionCodeSettings = {
            url: 'http://localhost:3000/signup',
            handleCodeInApp: true,
        };

        firebase.auth().sendSignInLinkToEmail(user.email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('email', user.email);
                setUser({
                    ...user,
                    error: 'The email has been checked successfully, please go to the email address to open the connection'
                })
            })
            .catch((error) => {
                setUser({
                    ...user,
                    error: error.message
                })
            });
    }

    return (
        <>
            <h1>Check Email</h1>
            <form onSubmit={handleSubmit} className="form-group">
                <p className="text-uppercase">
                    email:
                    <input type="text" className="form-control" placeholder="Email" name="email" onChange={handleChange} />
                </p>
                <button type="submit" className="btn btn-info">Check</button>
            </form>
            {user.error && <h4>{user.error}</h4>}

        </>
    )
}
