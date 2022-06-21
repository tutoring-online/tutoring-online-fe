import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isAdmin, isStudent, isTutor } from "settings/setting";
import AdminProfile from "./AdminProfile";
import TutorProfile from "./TutorProfile";


const Profile = () => {
    const user = useSelector(state => state.auth.user);
    console.log(user)
    if (isAdmin(user?.role)) {
        return <AdminProfile />
    }

    if (isTutor(user?.role)) {
        return <TutorProfile />
    }

    if (isStudent(user?.role)) {
        return <div>student profile</div>
    }

    return <Redirect to="home/index" />
}

export default Profile;