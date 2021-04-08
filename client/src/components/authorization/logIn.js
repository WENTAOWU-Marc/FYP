import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    // User State
    const [user, setUser] = useState({
        email: '',
        password: '',
        role: '1',
    });

    const [error, seterror] = useState('')

    // onChange function
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    };

    // Submit function (Log in user)
    const handleSubmit = e => {
        e.preventDefault();

        if (
            !user.email ||
            !user.password
        ) {
            seterror('Parameter cannot be empty');
            return false;
        }

        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(res => {
                if (res.code == 200) {
                    var final = {
                        ...res.data,
                        role: user.role
                    }
                    localStorage.setItem('user', JSON.stringify(final))
                    window.location.href = "/"
                } else {
                    seterror(res.msg)
                }
            })

    }

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    Email:
                    <input type="text" placeholder="Email" name="email" onChange={handleChange} /><br />
                </p>
                <p>
                    password:
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} /><br />
                </p>

                <p>
                    identity role:
                    &nbsp;
                    &nbsp;
                    <label>
                        <input type="radio" name="role" checked={user.role == '1'} value="1" onChange={handleChange} />
                        consumers
                    </label>
                    &nbsp;
                    &nbsp;
                    <label>
                        <input type="radio" name="role" checked={user.role == '2'} value="2" onChange={handleChange} />
                        merchants
                    </label>
                </p>
                <button type="submit">Login</button>
            </form>
            <Link to='/check'>
                <button>Sign up</button>
            </Link>
            {error && <h4>{error}</h4>}
        </>
    )

};

export default Login;