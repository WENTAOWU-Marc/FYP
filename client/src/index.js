import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"    // CHANGED
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebaseConfig';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const LoginPage = lazy(() => import("./components/authorization/logIn"))
const Signup = lazy(() => import("./components/authorization/signUp"))
const Check = lazy(() => import("./components/authorization/check"))
const SiteHeader = lazy(() => import("./components/Header"))
const UserInfo = lazy(() => import("./pages/UserInfo"))
const Home = lazy(() => import("./pages/Home"))
const RestList = lazy(() => import("./pages/Restlist"))
const AddRest = lazy(() => import("./pages/AddRest"))
const Food = lazy(() => import("./pages/Food"))
const Order = lazy(() => import("./pages/Order"))
const OrderInfo = lazy(() => import("./pages/OrderInfo"))

const App = () => {
    return (
        <BrowserRouter>
            <div className="jumbotron">
                <SiteHeader />
                <div className="container">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path='/check' component={Check} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/userinfo' component={UserInfo} />

                        <Route path='/rests' component={RestList} />
                        <Route path='/postRest' component={AddRest} />

                        <Route path='/foods/:restId' component={Food} />
                        <Route path='/orders/:_id' component={OrderInfo} />
                        <Route path='/orders' component={Order} />
                        <Route path='/' component={Home} />
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