import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getFullPath, ROUTES } from 'route/routes';
import { isStudent } from 'settings/setting';
import { isAdmin, isTutor } from 'settings/setting';

export default function RedirectHomeWithUserRole() {
    const user = useSelector(state => state.auth.user);

    if (isAdmin(user?.role)) {
        return <Redirect to={getFullPath(ROUTES.dashboard)} />
    }

    if (isTutor(user?.role)) {
        return <Redirect to={getFullPath(ROUTES.tutorSchedule)} />
    }

    if (isStudent(user?.student)) {
        return <Redirect to="/home/index" />
    }

    return (
        <Redirect to="/home/index" />
    )
}
