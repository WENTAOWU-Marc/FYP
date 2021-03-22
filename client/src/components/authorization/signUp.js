import React, { useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'

// import './Signup.css' ;


const Signup = () => {
    // User State
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        password: '',
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
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'http://localhost:3000/signup',
            // This must be true.
            handleCodeInApp: true,
        };

        firebase.auth().sendSignInLinkToEmail(user.email, actionCodeSettings)
            .then(() => {
                console.log('user.email -> :', user.email)
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('email', user.email);
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('errorMessage -> :', errorMessage)
            });



        // Sign up code here.
        // await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        //     .then(result => {
        //         // Update the nickname
        //         result.user.updateProfile({
        //             displayName: user.nickname,
        //         });

        //         // URL of my website.
        //         const myURL = { url: 'http://localhost:3000/' }

        //         // Send Email Verification and redirect to my website.
        //         result.user.sendEmailVerification(myURL)
        //             .then(() => {
        //                 setUser({
        //                     ...user,
        //                     verifyEmail: `Welcome ${user.nickname} . To continue please verify your email.`,
        //                 })
        //             })
        //             .catch(error => {
        //                 setUser({
        //                     ...user,
        //                     error: error.message,
        //                 })
        //             })
        //         window.location.replace("/");
        //         // Sign Out the user.
        //         // firebase.auth().signOut();
        //     }).catch(error => {
        //         // Update the error
        //         setUser({
        //             ...user,
        //             error: error.message,
        //         })
        //     })
    }


    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    name:
                    <input type="text" placeholder="Nickname" name="nickname" onChange={handleChange} />
                </p>
                <p>
                    email:
                    <input type="text" placeholder="Email" name="email" onChange={handleChange} />
                </p>
                <p>
                    password:
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                </p>

                <button type="submit">Sign Up</button>
            </form>
            {user.error && <h4>{user.error}</h4>}
        </>
    )
};

export default Signup;