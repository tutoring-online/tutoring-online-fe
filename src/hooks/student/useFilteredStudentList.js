import { isAvailableArray } from "helpers/arrayUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStudentActions from "./useStudentActions";

const useFilteredStudentList = (filter) => {
    const actions = useStudentActions();

    const filteredStudents = useSelector(state => state.student.filteredStudents);
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(false);

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
        actions.fetchStudentsWithFilter({ filter, setLoading });
    }, [actions, filter]);

    const refresh = useCallback(() => {
        actions.fetchStudentsWithFilter({ filter, setLoading });
    }, [actions, filter]);


    return {
        studentList,
        loading,
        refresh
    };
}

export default useFilteredStudentList;