import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isAdmin, isStudent, isTutor } from "settings/setting";
import AdminProfile from "./AdminProfile";
import TutorProfile from "./TutorProfile";


const Profile = () => {
    const user = useSelector(state => state.auth.user);

    if (isAdmin(user?.role)) {
        return <TutorProfile />
    }

    if (isTutor(user?.role)) {
        // return <AdminProfile />
        return <TutorProfile />
    }

    if (isStudent(user?.role)) {
        return <TutorProfile />
    }

    return <Redirect to="home/index" />
}

export default Profile;