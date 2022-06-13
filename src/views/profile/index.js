import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ROLES } from "settings/setting";
import AdminProfile from "./AdminProfile";


const Profile = () => {
    const user = useSelector(state => state.auth.user);

    if (user.role === ROLES.ADMIN) {
        return <AdminProfile />
    }

    if (user.role === ROLES.TUTOR) {
        return <div>tutor profile</div>
    }

    if (user.role === ROLES.STUDENT) {
        return <div>student profile</div>
    }

    return <Redirect to="home/index" />
}

export default Profile;