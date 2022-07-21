import { useEffect, useState } from "react";

//MUI
import Box from "@mui/material/Box";
import { Avatar, Button } from "@mui/material";

//Core component
import Table from "components/Table/Table.jsx";

//Hooks
import NoInformation from "components/Text/NoInformation";
import { renderStudentStatus } from "settings/student-setting";
import useFilteredStudentList from "hooks/student/useFilteredStudentList";
import { isAvailableArray } from "helpers/arrayUtils";
import EastIcon from '@mui/icons-material/East';
import { useHistory } from "react-router-dom";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";

const filter = {
	Sort: "-CreatedDate",
	Page: 0,
	Size: 5
}

const Student = () => {
	const history = useHistory();
	const {
		studentList,
		loading,
	} = useFilteredStudentList(filter);

	const [columns, setColumns] = useState([]);

	useEffect(() => {

		setColumns([
			{
				key: "name",
				label: "Name",
				render: (row) => (
					<Box
						display="flex"
						alignItems="center"
					>
						<Box
							component={Avatar}
							marginRight="1rem"
							alt="avatar"
							src={row.avatarURL}
							sx={{ width: 32, height: 32 }}
						/>
						{row.name || <NoInformation />}
					</Box>
				)
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderStudentStatus(row.status)
			},
		])
	}, [])

	const renderPanel = () => (
		<Box
			display="flex"
			flexFlow="row nowrap"
			alignItems="center"
			columnGap="0.5rem"
		>
			<Button
				variant="contained"
				color="primary"
				size="medium"
				onClick={() => {
					history.push(getFullPath(ROUTES.student))
				}}
				startIcon={<EastIcon fontSize="medium" />}
			>
				Go to dashboard
			</Button>
		</Box>
	)

	return (
		<>
				<Table
					title={"New students"}
					columns={columns}
					data={isAvailableArray(studentList) ? studentList.filter((item, index) => index < 5) : []}
					panel={renderPanel()}
					loadingData={loading}
					noPaging={true}
				/>
		</>
	)
}

export default Student;