import { useEffect, useState } from "react";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Avatar, Button, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddBoxIcon from '@mui/icons-material/AddBox';

//Core component
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";

//Hooks
import useTutorList from "hooks/tutor/useTutorList";

import { renderTutorStatus } from "settings/tutorSetting";
import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";

import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const Tutor = () => {
	const classes = useStyles();
	const tutorList = useTutorList();
	console.log(tutorList);

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
				key: "totalLessons",
				align: "center",
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
				render: (row) => renderTutorStatus(row.status)
			},
			{
				key: "action",
				align: "center",
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
				size="small"
				startIcon={<RefreshIcon fontSize="medium" />}
			>
				Refresh
			</Button>
			<Button
				variant="contained"
				color="primary"
				size="small"
				startIcon={<AddBoxIcon fontSize="medium" />}
			>
				Add
			</Button>
		</Box>
	)

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
					title={"List Tutor Users"}
					columns={columns}
					data={tutorList}
					panel={renderPanel()}
				/>
			</Container>
		</>
	)
}

export default Tutor;