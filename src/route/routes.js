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
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnKey from "@mui/icons-material/VpnKey";
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';
import TopicIcon from '@mui/icons-material/Topic';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClassIcon from '@mui/icons-material/Class';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//Admin
import Admin from "views/admin/Admin.js";
import Tutor from "views/admin/Tutor.js";
import Student from "views/admin/Student.js";
import Category from "views/admin/Category.js";
import Subject from "views/admin/Subject.js";
import Syllabus from "views/admin/Syllabus.js";
import Payment from "views/admin/Payment.js";

// core components
const Home = React.lazy(() => import('views/home/Home.jsx'));
const Dashboard = React.lazy(() => import('views/admin/Dashboard.js'));
const Login = React.lazy(() => import('views/auth/Login.js'));
const Signup = React.lazy(() => import('views/auth/Signup.js'));
const Logout = React.lazy(() => import('views/auth/Logout.js'));
const Profile = React.lazy(() => import('views/profile/index.js'));
const PageNotFound = React.lazy(() => import('views/auth/PageNotFound.jsx'));

const TutorSchedule = React.lazy(() => import('views/tutor/Schedule.js'));
const StudentSchedule = React.lazy(() => import('views/student/Schedule.js'));
const BookingHistory = React.lazy(() => import('views/student/StudentBookingHistory.js'));

export const ICON_COLORS = {
	Primary: "Primary",
	PrimaryLight: "PrimaryLight",
	Error: "Error",
	ErrorLight: "ErrorLight",
	Warning: "Warning",
	WarningLight: "WarningLight",
	Info: "Info",
	InfoLight: "InfoLight",
}

export const ROUTE_PATHS = {
	login: "/login",
	logout: "/logout",
	signup: "/signup",
	pageNotFound: "/page-not-found",

	home: "/index",
	profile: "/user-profile",
	dashboard: "/dashboard",

	admin: "/admins",
	tutor: "/tutors",
	student: "/students",
	payment: "/payments",
	category: "/category",
	subject: "/subjects",
	syllabus: "/syllabuses",

	booking: "/booking",
	schedule: "/schedule",
	class: "/class"
}

export const LAYOUT_PATHS = {
	admin: "/admin",
	auth: "/auth",
	home: "/home",
	detail: "/detail",
	tutor: "/tutor",
	student: "/student"
}

const TUTOR_ROUTES = {
	tutorSchedule: {
		key: "tutorSchedule",
		name: "Schedule",
		icon: CalendarMonthIcon,
		iconColor: ICON_COLORS.Warning,
		component: TutorSchedule,
		path: ROUTE_PATHS.schedule,
		layout: LAYOUT_PATHS.tutor
	},
}

const STUDENT_ROUTES = {
	studentSchedule: {
		key: "studentSchedule",
		name: "Schedule",
		icon: CalendarMonthIcon,
		iconColor: ICON_COLORS.Warning,
		component: StudentSchedule,
		path: ROUTE_PATHS.schedule,
		layout: LAYOUT_PATHS.student
	},
	studentBooking: {
		key: "studentBooking",
		name: "Booking history",
		icon: ClassIcon,
		iconColor: ICON_COLORS.InfoLight,
		component: BookingHistory,
		path: ROUTE_PATHS.booking,
		layout: LAYOUT_PATHS.student
	},
}

const ADMIN_ROUTES = {
	adminManagement: {
		title: "Management"
	},
	dashboard: {
		key: "dashboard",
		name: "Dashboard",
		icon: DashboardIcon,
		iconColor: ICON_COLORS.Primary,
		component: Dashboard,
		layout: LAYOUT_PATHS.admin,
		path: ROUTE_PATHS.dashboard,
	},
	dashboardDivider: {
		key: "dashboardDivider",
		divider: true,
		layout: LAYOUT_PATHS.admin,
	},
	tutor: {
		key: "tutor",
		name: "Tutor",
		icon: GroupIcon,
		iconColor: ICON_COLORS.Primary,
		component: Tutor,
		path: ROUTE_PATHS.tutor,
		layout: LAYOUT_PATHS.admin
	},
	student: {
		key: "student",
		name: "Student",
		icon: SchoolIcon,
		iconColor: ICON_COLORS.PrimaryLight,
		component: Student,
		path: ROUTE_PATHS.student,
		layout: LAYOUT_PATHS.admin
	},
	category: {
		key: "category",
		name: "Category",
		icon: CategoryIcon,
		iconColor: ICON_COLORS.InfoLight,
		component: Category,
		path: ROUTE_PATHS.category,
		layout: LAYOUT_PATHS.admin
	},
	subject: {
		key: "subject",
		name: "Subject",
		icon: TopicIcon,
		iconColor: ICON_COLORS.Info,
		component: Subject,
		path: ROUTE_PATHS.subject,
		layout: LAYOUT_PATHS.admin
	},
	syllabus: {
		key: "syllabus",
		name: "Syllabus",
		icon: ReceiptLongIcon,
		iconColor: ICON_COLORS.Warning,
		component: Syllabus,
		path: ROUTE_PATHS.syllabus,
		layout: LAYOUT_PATHS.admin
	},
	payment: {
		key: "payment",
		name: "Booking",
		icon: PaymentsIcon,
		iconColor: ICON_COLORS.Error,
		component: Payment,
		path: ROUTE_PATHS.payment,
		layout: LAYOUT_PATHS.admin
	},
	admin: {
		key: "admin",
		name: "Administrators",
		icon: AdminIcon,
		iconColor: ICON_COLORS.WarningLight,
		component: Admin,
		path: ROUTE_PATHS.admin,
		layout: LAYOUT_PATHS.admin
	},
	tableDivider: {
		key: "tableDivider",
		divider: true,
		layout: LAYOUT_PATHS.admin,
	},
}

export const ROUTES = {
	...ADMIN_ROUTES,
	...STUDENT_ROUTES,
	...TUTOR_ROUTES,
	profile: {
		key: "profile",
		name: "User Profile",
		icon: Person,
		iconColor: "WarningLight",
		component: Profile,
		path: ROUTE_PATHS.profile,
		layout: LAYOUT_PATHS.detail,
	},
	signup: {
		icon: PersonAddIcon,
		component: Signup,
		key: "signup",
		name: "Sign Up",
		iconColor: "Info",
		path: ROUTE_PATHS.signup,
		layout: LAYOUT_PATHS.auth,
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
		icon: LogoutIcon,
		iconColor: "Primary",
		component: Logout,
		path: ROUTE_PATHS.logout,
		layout: LAYOUT_PATHS.auth,
		upgradeToPro: true
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
	},
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
