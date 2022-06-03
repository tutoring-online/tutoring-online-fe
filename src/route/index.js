import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import routes from "./routes";

// import { LAYOUTS } from "layouts/setting";
const AuthLayout = React.lazy(() => import('layouts/Auth.js'));
const AdminLayout = React.lazy(() => import('layouts/Admin.js'));

// const getLayout = (layout) => {
//     if(layout === LAYOUTS.admin) {
//         return AdminLayout;
//     }

//     if(layout === LAYOUTS.auth) {
//         return AuthLayout;
//     }

//     return AuthLayout;
// }

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