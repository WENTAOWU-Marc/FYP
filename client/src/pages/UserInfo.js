import React, { useState } from 'react'
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';


export default function UserInfo () {

    const firebase = useFirebaseApp()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const changeVal = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const sumit = () => {
        console.log('user -> :', user)
        if (
            !user.name ||
            !user.email ||
            !user.password ||
            !user.address ||
            !user.tel ||
            !user.latitude ||
            !user.longitude
        ) {
            alert('Parameter cannot be empty');
            return false;
        }

        fetch('/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.msg);
                localStorage.clear();
                window.location.href = '/'
            })


    }


    return (
        <div>
            <form action="">
                <p>Name:<input type="text" name="name" value={user.name} onChange={changeVal} /></p>
                <p>email:<input type="text" name="email" value={user.email} onChange={changeVal} /></p>
                <p>address:<input type="text" name="address" value={user.address} onChange={changeVal} /></p>

                <p>tel:<input type="text" name="tel" value={user.tel} onChange={changeVal} /></p>

                <p>latitude:<input type="text" name="latitude" value={user.latitude} onChange={changeVal} /></p>
                <p>longitude:<input type="text" name="longitude" value={user.longitude} onChange={changeVal} /></p>
                <p>
                    <button type="button" onClick={sumit}>submit</button>
                </p>
            </form>
        </div>
    )
}
