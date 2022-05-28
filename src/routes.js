// core components
import Dashboard from "views/admin/Dashboard.js";
import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
import Maps from "views/admin/Maps.js";
import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
import Tables from "views/admin/Tables.js";

// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
import FlashOn from "@material-ui/icons/FlashOn";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Grain from "@material-ui/icons/Grain";
import LocationOn from "@material-ui/icons/LocationOn";
import Person from "@material-ui/icons/Person";
import Tv from "@material-ui/icons/Tv";
import VpnKey from "@material-ui/icons/VpnKey";

var routes = [
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
		path: "/login",
		name: "Login",
		icon: VpnKey,
		iconColor: "Info",
		component: Login,
		layout: "/auth",
	},
	{
		path: "/register",
		name: "Register",
		icon: AccountCircle,
		iconColor: "ErrorLight",
		component: Register,
		layout: "/auth",
	},
];
export default routes;
