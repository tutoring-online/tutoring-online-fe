import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const AuthLayout = React.lazy(() => import('layouts/Auth.js'));
const AdminLayout = React.lazy(() => import('layouts/Admin.js'));

const Router = () => (
    <BrowserRouter basename="/">
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                <Redirect from="/" to="/auth/login" />
            </Switch>
        </Suspense>
    </BrowserRouter>
)

export default Router;