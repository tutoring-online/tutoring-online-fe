import FullPageLoader from "components/Loading/FullPageLoader";
import useAuthentication from "hooks/auth/useAuthentication";
import useSubscribeUser from "hooks/notification/useSubscribeUser";
import React, { memo, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import RedirectHomeWithUserRole from "views/home/RedirectHomeWithUserRole";
import { LAYOUT_PATHS } from "./routes";

const AuthLayout = React.lazy(() => import('layouts/Auth.js'));
const AdminLayout = React.lazy(() => import('layouts/Admin.js'));
const HomeLayout = React.lazy(() => import('layouts/Home.js'));
const DetailLayout = React.lazy(() => import('layouts/Detail'));

const isFunction = (func) => {
    return func != null && typeof func === "function";
}

const AuthenticationWrapper = ({ children }) => {
    const loading = useAuthentication();
    return isFunction(children) ? children(loading) : children;
}

const Router = () => {
    useSubscribeUser();
    
    return (
        <BrowserRouter>
            <Suspense fallback={<FullPageLoader />}>
                <Switch>
                    <AuthenticationWrapper>
                        {(loading) => (
                            <>
                                <Route path={LAYOUT_PATHS.admin} render={(props) => <AdminLayout authLoading={loading} {...props} />} />
                                <Route path={LAYOUT_PATHS.auth} render={(props) => <AuthLayout authLoading={loading} {...props} />} />
                                <Route path={LAYOUT_PATHS.home} render={(props) => <HomeLayout authLoading={loading} {...props} />} />
                                <Route path={LAYOUT_PATHS.detail} render={(props) => <DetailLayout authLoading={loading} {...props} />} />
                                <Route path="/" exact render={() => <RedirectHomeWithUserRole />} />
                            </>
                        )}
                    </AuthenticationWrapper>
                    <Redirect from="*" to="/auth/page-not-found" />
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

export default memo(Router);