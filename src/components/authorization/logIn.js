import React, { useState } from 'react' ;
import { useFirebaseApp } from 'reactfire' ;
import 'firebase/auth'
import { Link } from 'react-router-dom';
 
const Login = () => {
  // User State
  const [user, setUser] = useState({
    email : '' ,
    password : '' ,
    error : '' ,
  });
 
  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error : '' ,
    })
  };
 
  // Import firebase
  const firebase = useFirebaseApp();
 
  // Submit function (Log in user)
  const handleSubmit = e => {
    let name="";
    e.preventDefault();
    // Log in code here.
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then( result => {
        console.log(result)
        if (!result.user.emailVerified) {
          setUser({
            ...user,
            error : 'Please verify your email before to continue' ,
          })
          firebase.auth().signOut();
          
        }
        if(result.operationType==="signIn"){
          name=result.user.displayName
          console.log(name)
          
         console.log(result.user)
         
           
          window.location.replace("./");
          

        }

      })
      .then(result=>{
        
       
        }

      )
      .catch( error => {
        var errorCode = error.code;
        // var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          console.log(error);
        }
        // Update the error
        setUser({
          ...user,
          error : error.message,
        })
      }
      )
      
  }
 
  return (
    
   
    <>
    
       <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" name="email" onChange={handleChange}/><br />
        <input type="password" placeholder="Password" name="password" onChange={handleChange}/><br />
        <button type="submit">Login</button>
      </form>
      <Link to='./signup'> 
        <button>Sign up</button>
      </Link>
      {user.error && <h4>{user.error}</h4>}
    </>
  )
  
};
 
export default Login;