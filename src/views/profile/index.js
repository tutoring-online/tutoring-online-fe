import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isAdmin, isStudent, isTutor } from "settings/setting";
import AdminProfile from "./AdminProfile";


const Profile = () => {
    const user = useSelector(state => state.auth.user);

    if (isAdmin(user?.role)) {
        return <AdminProfile />
    }

    if (isTutor(user?.role)) {
        return <div>tutor profile</div>
    }

    if (isStudent(user?.role)) {
        return <div>student profile</div>
    }

    return <Redirect to="home/index" />
}

export default Profile;