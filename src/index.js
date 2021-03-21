import React,{ lazy,Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"    // CHANGED
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebaseConfig';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const LoginPage = lazy(() => import("./pages/loginPage"))
const Signup = lazy(() => import("./components/authorization/signUp"))
const SiteHeader = lazy(() => import("./components/siteHeader"))

const App = () => {
  return (
    <BrowserRouter>
    <div className="jumbotron">
      <SiteHeader /> 
      <div className="container-fluid">
            <Switch>
            <Route path="/" component={LoginPage} />
            <Route path='/signup' component={Signup} />
            <Redirect from="*" to="/" />
            </Switch>

      </div>
    </div>
 </BrowserRouter>  
 );
};

//JSX语法
ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={<h3>Loading...</h3>}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById('root')
);