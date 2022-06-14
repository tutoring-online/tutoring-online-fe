import { useEffect } from "react";
import { useSelector } from "react-redux";
import useStudentActions from "./useStudentActions.js";

const useStudentList = () => {
    const studentList = useSelector(state => state.student.students);
    const actions = useStudentActions();

    useEffect(() => {
        actions.fetchStudents();
    }, [actions])
    
    return studentList;
}

export default useStudentList;