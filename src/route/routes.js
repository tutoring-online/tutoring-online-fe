// core components
import Dashboard from "views/admin/Dashboard.js";
import Login from "views/auth/Login.js";
import Profile from "views/admin/Profile.js";

// import Maps from "views/admin/Maps.js";
// import Icons from "views/admin/Icons.js";
// import Tables from "views/admin/Tables.js";

import Logout from "components/Logout";

// @mui/icons-material components
// import FlashOn from "@mui/icons-material/FlashOn";
// import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
// import Grain from "@mui/icons-material/Grain";
// import LocationOn from "@mui/icons-material/LocationOn";
import Person from "@mui/icons-material/Person";
import Tv from "@mui/icons-material/Tv";
import VpnKey from "@mui/icons-material/VpnKey";

export const adminRoutes = [
	{
		path: "/index",
		name: "Dashboard",
		icon: Tv,
		iconColor: "Primary",
		component: Dashboard,
		layout: "/admin",
	},
	{
		key: "profile",
		path: "/user-profile",
		name: "User Profile",
		icon: Person,
		iconColor: "WarningLight",
		component: Profile,
		layout: "/admin",
	},
	{
		key: "logout",
		path: "/logout",
		name: "Logout",
		icon: VpnKey,
		iconColor: "Primary",
		component: Logout,
		layout: "/admin",
	},
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
]

export const authRoutes = [
	{
		key: "login",
		path: "/login",
		name: "Login",
		icon: VpnKey,
		iconColor: "Info",
		component: Login,
		layout: "/auth",
	},
]

export const userRoutes = [
	{
		key: "profile",
		path: "/user-profile",
		name: "User Profile",
		icon: Person,
		iconColor: "WarningLight",
		component: Profile,
		layout: "/user",
	},
	{
		key: "logout",
		path: "/logout",
		name: "Logout",
		icon: VpnKey,
		iconColor: "Primary",
		component: Logout,
		layout: "/user",
	},
]

const routes = [
	...adminRoutes,
	...userRoutes,
	...authRoutes,
];
export default routes;
