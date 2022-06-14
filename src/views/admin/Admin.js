
//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//Core component
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";

//Hooks
import useAdminList from "hooks/admin/useAdminList";

import componentStyles from "assets/theme/views/admin/tables.js";
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import NoInformation from "components/Text/NoInformation";
import { renderAdminStatus } from "settings/adminSetting";

const useStyles = makeStyles(componentStyles);

const AdminTable = () => {
	const classes = useStyles();
	const adminList = useAdminList();
	console.log(adminList);

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
					>
						<Tooltip title={"Edit"}>
							<IconButton style={{padding: 5}}>
								<EditIcon fontSize="large"/>
							</IconButton>
						</Tooltip>
						<Tooltip title={"Delete"}>
							<IconButton style={{padding: 5}}>
								<DeleteForeverIcon fontSize="large"/>
							</IconButton>
						</Tooltip>
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
					data={adminList}
				/>
			</Container>
		</>
	)
}

export default AdminTable;