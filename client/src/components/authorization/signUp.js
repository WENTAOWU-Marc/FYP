import React, { useState } from 'react';
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
            <form onSubmit={handleSubmit} className="form-group">
                <p className="text-uppercase">
                    name:
                    <input type="text" className="form-control" placeholder="Name" name="name" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    email:
                    <input readOnly type="text" className="form-control" placeholder="Email" value={user.email} name="email" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    password:
                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    tel:
                    <input type="tel" className="form-control" placeholder="tel" name="tel" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    address:
                    <input type="text" className="form-control" placeholder="address" name="address" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    longitude:
                    <input type="number" className="form-control" step="0.0000001" placeholder="longitude" name="longitude" onChange={handleChange} />
                </p>
                <p className="text-uppercase">
                    latitude:
                    <input type="number" className="form-control" step="0.0000001" placeholder="latitude" name="latitude" onChange={handleChange} />
                </p>

                <button type="submit" className="btn btn-info">Sign Up</button>
                <Link to='/'>
                    <button className="btn btn-info">Login</button>
                </Link>
            </form>
            {error && <h4>{error}</h4>}
        </>
    )
};

export default Signup;