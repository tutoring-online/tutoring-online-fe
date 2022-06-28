import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTutorActions from "./useTutorActions";


const useTutorDetail = (id) => {
    const actions = useTutorActions();
    const tutorDetail = useSelector(state => state.tutor.tutorDetail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        actions.clearTutorDetail();
        actions.fetchTutorDetail({ id, setLoading });
    }, [actions, id]);

    return {
        tutorDetail,
        loading
    };
}

export default useTutorDetail;