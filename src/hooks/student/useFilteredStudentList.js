import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useStudentActions from "./useStudentActions";

const useFilteredStudentList = (filter) => {
    const actions = useStudentActions();

    const filteredStudents = useSelector(state => state.student.filteredStudents);
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(false);

    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return() => mounted.current = false;
    }, [])

    const loadingCallback = useCallback((isLoading) => {
        if(mounted.current === true) {
            setLoading(Boolean(isLoading));
        }
    }, []);

    useEffect(() => {
        const data = (isAvailableArray(filteredStudents)) ?
            filteredStudents : filteredStudents?.data;

        if (!isAvailableArray(data)) {
            setStudentList([]);
            return;
        }

        setStudentList([...data]);
    }, [filter, filteredStudents])


    useEffect(() => {
        actions.fetchStudentsWithFilter({ filter, setLoading: loadingCallback });
    }, [actions, filter, loadingCallback]);

    const refresh = useCallback(() => {
        actions.fetchStudentsWithFilter({ filter, setLoading: loadingCallback });
    }, [actions, filter, loadingCallback]);


    return {
        studentList,
        loading,
        refresh
    };
}

export default useFilteredStudentList;