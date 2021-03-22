import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"    // CHANGED
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebaseConfig';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const LoginPage = lazy(() => import("./components/authorization/login"))
const Signup = lazy(() => import("./components/authorization/signUp"))
const SiteHeader = lazy(() => import("./components/Header"))
const UserInfo = lazy(() => import("./pages/UserInfo"))
const Home = lazy(() => import("./pages/Home"))

const App = () => {
    return (
        <BrowserRouter>
            <div className="jumbotron">
                <SiteHeader />
                <div className="container-fluid">
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/userinfo' component={UserInfo} />
                        <Route path="/" component={LoginPage} />
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