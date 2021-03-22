import React, { useState } from 'react'
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';


export default function UserInfo () {

    const firebase = useFirebaseApp()

    const [user, setUser] = useState({
        name: JSON.parse(localStorage.getItem('user')).name,
        email: JSON.parse(localStorage.getItem('user')).email,
    })

    const changeVal = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const sumit = () => {
        var fuser = firebase.auth().currentUser;
        console.log('user -> :', user)

        fuser.updateProfile({
            displayName: user.name,
            email: user.email,
        }).then(function () {
            firebase.auth().signOut();
            window.location.replace("/");
        }).catch(function (error) {
            alert(error.message)
        });
    }


    return (
        <div>
            <form action="">
                <p>displayName:<input type="text" name="name" value={user.name} onChange={changeVal} /></p>
                <p>email:<input type="text" name="email" value={user.email} onChange={changeVal} /></p>
                <p>
                    <button type="button" onClick={sumit}>submit</button>
                </p>
            </form>
        </div>
    )
}