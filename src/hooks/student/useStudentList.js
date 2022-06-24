import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStudentActions from "./useStudentActions";

const useStudentList = () => {
    const actions = useStudentActions();

    const studentList = useSelector(state => state.student.students);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        actions.fetchStudents({ setLoading });
    }, [actions])

    const refresh = useCallback(() => {
        actions.fetchStudents({ setLoading });
    }, [actions])

    return {
        studentList,
        loading,
        refresh
    };
}

export default useStudentList;