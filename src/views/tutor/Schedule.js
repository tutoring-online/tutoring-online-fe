import { useState } from "react";
import { useSelector } from "react-redux";

import makeStyles from '@mui/styles/makeStyles';
import componentStyles from "assets/theme/views/admin/tables.js";
import { Box, Container } from "@mui/system";
import { Card } from "@mui/material";
import EmptyHeader from "components/Headers/EmptyHeader";
import ScheduleFilter from "./ScheduleFilter";
import DashBoardCalendar from "components/Calendar/DashBoardCalendar";
import useTutorClasses from "hooks/tutor/useTutorClasses";
import useClassesDetailedLessons from "hooks/lesson/useClassesDetailedLessons";
import { isAvailableArray } from "helpers/arrayUtils";

const useStyles = makeStyles(componentStyles);


const getClassOptions = (classes) => {
	const options = [{ label: "All", value: "" }];
	if (isAvailableArray(classes)) {
		const temp = classes.map(classItem => ({
			...classItem,
			label: `${classItem.syllabus?.name} - ${classItem.student?.name}`,
			value: classItem.id
		}))
		options.push(...temp);
	}

	return options;
}

const TutorSchedule = () => {
	const styleClasses = useStyles();
	const user = useSelector(state => state.auth.user);

	const [classFilter, setClassFilter] = useState(null);
	const [lessonFilter, setLessonFilter] = useState(null);

	const { classes } = useTutorClasses(user?.id, classFilter);
	const { detailedLessons } = useClassesDetailedLessons(classes, lessonFilter);

	return (
		<>
			<EmptyHeader />
			<Container
				maxWidth={false}
				component={Box}
				marginTop="-6rem"
				classes={{ root: styleClasses.containerRoot }}
			>
				<Card
					classes={{ root: styleClasses.cardRoot }}
					sx={{
						borderRadius: "4px",
						padding: "0 8px",
						paddingBottom: "8px",
						marginBottom: "2rem",
						background: "#fff"
					}}
				>
					<ScheduleFilter
						classOption={getClassOptions(classes)}
						setClassFilter={setClassFilter}
						setLessonFilter={setLessonFilter}
					/>
				</Card>

				<Card
					classes={{ root: styleClasses.cardRoot }}
				>
					<DashBoardCalendar
						lessons={detailedLessons}
					/>
				</Card>
			</Container>
		</>
	)
}

export default TutorSchedule;