
//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//Core component
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";

//Hooks
import useTutorList from "hooks/tutor/useTutorList";

import componentStyles from "assets/theme/views/admin/tables.js";
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import NoInformation from "components/Text/NoInformation";
import { renderAdminStatus } from "settings/adminSetting";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";

const useStyles = makeStyles(componentStyles);

const Admin = () => {
	const classes = useStyles();
	
	const tutorList = useTutorList();
	console.log(tutorList);

	const [columns, setColumns] = useState([]);

	useEffect(() => {
		setColumns([
			{
				key: "name",
				label: "Name",
				render: (admin) => (
					<Box
						display="flex"
						alignItems="center"
					>
						<Box
							component={Avatar}
							marginRight="1rem"
							alt="avatar"
							src={admin.avatarURL}
							sx={{ width: 32, height: 32 }}
						/>
						{admin.name}
					</Box>
				)
			},
			{
				key: "email",
				label: "Email",
				render: (admin) => admin.email || <NoInformation />
			},
			{
				key: "phone",
				label: "Phone",
				render: (admin) => admin.phone || <NoInformation />
			},
			{
				key: "status",
				label: "Status",
				render: (admin) => renderAdminStatus(admin.status)
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
						<BootstrapTooltip title="Edit">
							<IconButton style={{ padding: 5 }}>
								<EditIcon sx={{ width: 18, height: 18 }} />
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
					title={"Admin List"}
					columns={columns}
					data={tutorList}
				/>
			</Container>
		</>
	)
}

export default Admin;