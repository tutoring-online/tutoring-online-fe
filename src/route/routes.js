import React from "react";

// import Maps from "views/admin/Maps.js";
// import Icons from "views/admin/Icons.js";
// import Tables from "views/admin/Tables.js";


// @mui/icons-material components
// import FlashOn from "@mui/icons-material/FlashOn";
// import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
// import Grain from "@mui/icons-material/Grain";
// import LocationOn from "@mui/icons-material/LocationOn";
import Person from "@mui/icons-material/Person";
import Tv from "@mui/icons-material/Tv";
import VpnKey from "@mui/icons-material/VpnKey";


// core components
const Home = React.lazy(() => import('views/home/Home.jsx'));
const Dashboard = React.lazy(() => import('views/admin/Dashboard.js'));
const Login = React.lazy(() => import('views/auth/Login.js'));
const Profile = React.lazy(() => import('views/admin/Profile.js'));
const Logout = React.lazy(() => import('views/auth/Logout.js'));
const PageNotFound = React.lazy(() => import('views/auth/PageNotFound.jsx'));

export const ROUTE_PATHS = {
	login: "/login",
	logout: "/logout",
	pageNotFound: "/page-not-found",

	home: "/index",
	profile: "/user-profile",
	dashboard: "/dashboard"
}

export const LAYOUT_PATHS = {
	admin: "/admin",
	auth: "/auth",
	home: "/home"
}

export const ROUTES = {
	dashboard: {
		key: "dashboard",
		name: "Dashboard",
		icon: Tv,
		iconColor: "Primary",
		component: Dashboard,
		layout: LAYOUT_PATHS.admin,
		path: ROUTE_PATHS.dashboard,
	},
	adminProfile: {
		key: "profile",
		name: "User Profile",
		icon: Person,
		iconColor: "WarningLight",
		component: Profile,
		path: ROUTE_PATHS.profile,
		layout: LAYOUT_PATHS.admin,
	},
	login: {
		icon: VpnKey,
		component: Login,
		key: "login",
		name: "Login",
		iconColor: "Info",
		path: ROUTE_PATHS.login,
		layout: LAYOUT_PATHS.auth,
	},
	logout: {
		key: "logout",
		name: "Logout",
		icon: VpnKey,
		iconColor: "Primary",
		component: Logout,
		path: ROUTE_PATHS.logout,
		layout: LAYOUT_PATHS.auth,
	},
	pageNotFound: {
		key: "pageNotFound",
		name: "Page Not Found",
		component: PageNotFound,
		layout: LAYOUT_PATHS.auth,
		path: ROUTE_PATHS.pageNotFound,
	},
	home: {
		key: "home",
		name: "Home Page",
		component: Home,
		path: ROUTE_PATHS.home,
		layout: LAYOUT_PATHS.home,
	}
}

export const getFullPath = (route, defaultPath = "/home/index") => {
	if (!route) return defaultPath;

	const fullPath = (route.layout || "") + (route.path || "");
	return fullPath || defaultPath;
}

const routes = Object.values(ROUTES);

// {
// 	path: "/maps",
// 	name: "Maps",
// 	icon: LocationOn,
// 	iconColor: "Warning",
// 	component: Maps,
// 	layout: "/admin",
// },
// {
// 	path: "/icons",
// 	name: "Icons",
// 	icon: Grain,
// 	iconColor: "Primary",
// 	component: Icons,
// 	layout: "/admin",
// },
// {
// 	path: "/tables",
// 	name: "Tables",
// 	icon: FormatListBulleted,
// 	iconColor: "Error",
// 	component: Tables,
// 	layout: "/admin",
// },

export default routes;
