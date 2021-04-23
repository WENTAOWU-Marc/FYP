import React, { useState } from 'react'
// import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';


export default function UserInfo () {

    // const firebase = useFirebaseApp()

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
            <form action="" className="form-group">
                <p className="text-uppercase">Name:<input type="text" className="form-control" name="name" value={user.name} onChange={changeVal} /></p>
                <p className="text-uppercase">email:<input type="text" className="form-control" name="email" value={user.email} onChange={changeVal} /></p>
                <p className="text-uppercase">address:<input type="text" className="form-control" name="address" value={user.address} onChange={changeVal} /></p>

                <p className="text-uppercase">tel:<input type="text" className="form-control" name="tel" value={user.tel} onChange={changeVal} /></p>

                <p className="text-uppercase">latitude:<input type="text" className="form-control" name="latitude" value={user.latitude} onChange={changeVal} /></p>
                <p className="text-uppercase">longitude:<input type="text" className="form-control" name="longitude" value={user.longitude} onChange={changeVal} /></p>
                <p >
                    <button type="button" className="btn btn-info" onClick={sumit}>submit</button>
                </p>
            </form>
        </div>
    )
}
