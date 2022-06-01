// core components
import Dashboard from "views/admin/Dashboard.js";
import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
import Maps from "views/admin/Maps.js";
import Profile from "views/admin/Profile.js";
import Tables from "views/admin/Tables.js";

import Logout from "components/Logout";

// @mui/icons-material components
import FlashOn from "@mui/icons-material/FlashOn";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import Grain from "@mui/icons-material/Grain";
import LocationOn from "@mui/icons-material/LocationOn";
import Person from "@mui/icons-material/Person";
import Tv from "@mui/icons-material/Tv";
import VpnKey from "@mui/icons-material/VpnKey";

const routes = [
	{
		href: "#pablo",
		name: "Upgrade to pro",
		icon: FlashOn,
		upgradeToPro: true,
	},
	{
		path: "/index",
		name: "Dashboard",
		icon: Tv,
		iconColor: "Primary",
		component: Dashboard,
		layout: "/admin",
	},
	{
		path: "/icons",
		name: "Icons",
		icon: Grain,
		iconColor: "Primary",
		component: Icons,
		layout: "/admin",
	},
	{
		path: "/maps",
		name: "Maps",
		icon: LocationOn,
		iconColor: "Warning",
		component: Maps,
		layout: "/admin",
	},
	{
		path: "/user-profile",
		name: "User Profile",
		icon: Person,
		iconColor: "WarningLight",
		component: Profile,
		layout: "/admin",
	},
	{
		path: "/tables",
		name: "Tables",
		icon: FormatListBulleted,
		iconColor: "Error",
		component: Tables,
		layout: "/admin",
	},
	{
		path: "/logout",
		name: "Logout",
		icon: VpnKey,
		iconColor: "Primary",
		component: Logout,
		layout: "/admin",
	},
	{
		path: "/login",
		name: "Login",
		icon: VpnKey,
		iconColor: "Info",
		component: Login,
		layout: "/auth",
	},
];
export default routes;
