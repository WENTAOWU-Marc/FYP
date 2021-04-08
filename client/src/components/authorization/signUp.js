import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import './Signup.css' ;


const Signup = () => {
    // User State
    const [user, setUser] = useState({
        name: '',
        email: localStorage.getItem('email'),
        password: '',
        tel: '',
        address: '',
        longitude: '',
        latitude: '',
    });

    const [error, seterror] = useState('')

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    };

    // onChange function
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !user.name ||
            !user.email ||
            !user.password ||
            !user.address ||
            !user.tel ||
            !user.latitude ||
            !user.longitude
        ) {
            seterror('Parameter cannot be empty');
            return false;
        }

        fetch('/users/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(res => {
                seterror(res.msg)
            })
    }

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    name:
                    <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                </p>
                <p>
                    email:
                    <input readOnly type="text" placeholder="Email" value={user.email} name="email" onChange={handleChange} />
                </p>
                <p>
                    password:
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                </p>
                <p>
                    tel:
                    <input type="tel" placeholder="tel" name="tel" onChange={handleChange} />
                </p>
                <p>
                    address:
                    <input type="text" placeholder="address" name="address" onChange={handleChange} />
                </p>
                <p>
                    longitude:
                    <input type="number" step="0.0000001" placeholder="longitude" name="longitude" onChange={handleChange} />
                </p>
                <p>
                    latitude:
                    <input type="number" step="0.0000001" placeholder="latitude" name="latitude" onChange={handleChange} />
                </p>

                <button type="submit">Sign Up</button>
                <Link to='/'>
                    <button>Login</button>
                </Link>
            </form>
            {error && <h4>{error}</h4>}
        </>
    )
};

export default Signup;