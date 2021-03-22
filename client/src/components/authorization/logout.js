import React from 'react' ;
import { useFirebaseApp } from 'reactfire' ;
import 'firebase/auth';
import firebase from 'firebase'

const Logout = () => {
  const user = firebase.auth().currentUser;
  console.log(user);
  // Import firebase

  const firebaseuser = useFirebaseApp();
 
  // Log out function
  const handleClick = () => {
    firebaseuser.auth().signOut();
    alert("You have successfully signed out")
    window.location.replace("./");
    
  }
 
  return (
    
    <>
    <h3>user's email</h3>
    <h2>{user.email}</h2>
    <h3>user's name </h3>
    <h2>{user.displayName}</h2>
       <button type="button" onClick={handleClick}>Log Out</button> 
    </>
  )
};
 
export default Logout;