import FullPageLoader from "components/Loading/FullPageLoader";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { LAYOUT_PATHS } from "./routes";

const AuthLayout = React.lazy(() => import('layouts/Auth.js'));
const AdminLayout = React.lazy(() => import('layouts/Admin.js'));
const HomeLayout = React.lazy(() => import('layouts/Home.js'));
const DetailLayout = React.lazy(() => import('layouts/Detail'));

const Router = () => (
    <BrowserRouter basename="/">
        <Suspense fallback={<FullPageLoader />}>
            <Switch>
                <Route path={LAYOUT_PATHS.admin} render={(props) => <AdminLayout {...props} />} />
                <Route path={LAYOUT_PATHS.auth} render={(props) => <AuthLayout {...props} />} />
                <Route path={LAYOUT_PATHS.home} render={(props) => <HomeLayout {...props} />} />
                <Route path={LAYOUT_PATHS.detail} render={(props) => <DetailLayout {...props} />} />
                <Redirect from="/" to="/home/index" />
                <Redirect to="/auth/page-not-found" />
            </Switch>
        </Suspense>
    </BrowserRouter>
)

export default Router;