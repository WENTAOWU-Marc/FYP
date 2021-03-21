
import React from 'react';
import Login from '../components/authorization/logIn';
import Logout from '../components/authorization/logout';
import firebase from 'firebase'

function LoginPage() {
  const user = firebase.auth().currentUser

  return (
    < div className="App" >
      {
        user &&
        <Logout />
      }
      {
        !user &&
        <>
          <Login />
        </>
      }
    </ div >
  );
}

export default LoginPage;