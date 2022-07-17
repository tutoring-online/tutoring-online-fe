import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePaymentActions from "./usePaymentActions";

const useFilteredTutorList = (filter) => {
    const actions = usePaymentActions();

    const filteredTutors = useSelector(state => state.tutor.filteredTutors);
    const [tutorList, setTutorList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAvailableArray(filteredTutors?.data)) {
            setTutorList([]);
            return;
        }

        setTutorList([...filteredTutors.data]);
    }, [filteredTutors])


    useEffect(() => {
        actions.fetchTutorsWithFilter({ filter, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        actions.fetchTutorsWithFilter({ filter, setLoading });
    }, [actions, filter]);


    return {
        tutorList,
        loading,
        refresh
    };
}

export default useFilteredTutorList;