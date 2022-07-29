import { useState } from "react";

import makeStyles from '@mui/styles/makeStyles';
import componentStyles from "assets/theme/views/admin/tables.js";
import { Box, Container } from "@mui/system";
import { Card } from "@mui/material";
import EmptyHeader from "components/Headers/EmptyHeader";
import ScheduleFilter from "./ScheduleFilter";
import DashBoardCalendar from "components/Calendar/DashBoardCalendar";
import useTutorClasses from "hooks/tutor/useTutorClasses";
import useClassesDetailedLessons from "hooks/lesson/useClassesDetailedLessons";

const useStyles = makeStyles(componentStyles);

const TutorSchedule = () => {
	const styleClasses = useStyles();

	const [classFilter, setClassFilter] = useState(null);
	const [lessonFilter, setLessonFilter] = useState(null);

	const { classes, loading: loadingClasses } = useTutorClasses(classFilter);
	const { detailedLessons, loading: loadingLessons } = useClassesDetailedLessons(classes, lessonFilter);

	return (
		<>
			<EmptyHeader />
			<Container
				maxWidth={false}
				component={Box}
				marginTop="-10rem"
				classes={{ root: styleClasses.containerRoot }}
			>
				<Card
					classes={{ root: styleClasses.cardRoot }}
					sx={{
						borderRadius: "16px",
						paddingBottom: "8px",
						marginBottom: "2rem",
						background: "#fff",
						position: "sticky",
						top: "0.5rem",
						zIndex: 1000,
						boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
					}}
				>
					<ScheduleFilter
						loading={loadingLessons || loadingClasses}
						detailedLessons={detailedLessons}
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