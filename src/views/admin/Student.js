import { useEffect, useState } from "react";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Avatar, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

//Core component
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";

//Hooks
import useStudentList from "hooks/student/useStudentList";

import NoInformation from "components/Text/NoInformation";

import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";

import componentStyles from "assets/theme/views/admin/tables.js";
import { renderStudentStatus } from "settings/studentSetting";
const useStyles = makeStyles(componentStyles);

const Student = () => {
	const classes = useStyles();
	const studentList = useStudentList();
	console.log(studentList);

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
				key: "grade",
				label: "Grade",
				render: (row) => row.grade != null ? row.grade : <NoInformation />
			},
			{
				key: "totalLessons",
				label: (
					<BootstrapTooltip title="Total lessons">
						<div>Lessons</div>
					</BootstrapTooltip>
				),
				render: (row) => row.totalLessons || 0
			},
			{
				key: "email",
				label: "Email",
				render: (row) => row.email || <NoInformation />
			},
			{
				key: "phone",
				label: "Phone",
				render: (row) => row.phone || <NoInformation />
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderStudentStatus(row.status)
			},
			{
				key: "action",
				label: "Actions",
				render: () => (
					<Box
						component="div"
						display="flex"
						alignItems="center"
						columnGap="8px"
						fontSize="13px"
					>
						<BootstrapTooltip title="Detail">
							<IconButton style={{ padding: 5 }}>
								<SettingsIcon sx={{ width: 18, height: 18 }} />
							</IconButton>
						</BootstrapTooltip>
						<BootstrapTooltip title="Delete">
							<IconButton style={{ padding: 5 }}>
								<DeleteForeverIcon sx={{ width: 18, height: 18 }} />
							</IconButton>
						</BootstrapTooltip>
					</Box>
				)
			},
		])
	}, [])

	return (
		<>
			<Header />
			<Container
				maxWidth={false}
				component={Box}
				marginTop="-6rem"
				classes={{ root: classes.containerRoot }}
			>
				<Table
					title={"List Student Users"}
					columns={columns}
					data={studentList}
				/>
			</Container>
		</>
	)
}

export default Student;