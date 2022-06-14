
//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//Core component
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";

//Hooks
import useAdminList from "hooks/admin/useAdminList";

import componentStyles from "assets/theme/views/admin/tables.js";
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from "react";

const useStyles = makeStyles(componentStyles);

const AdminTable = () => {
	const classes = useStyles();
	const adminList = useAdminList();
	console.log(adminList);

	const [columns, setColumns] = useState([]);

	useEffect(() => {
		setColumns([
			{
				key: "Project",
				label: "Project",
				render: (admin) => admin.name
			},
			{
				key: "Budget",
				label: "Budget",
				render: (admin) => admin.name
			},
			{
				key: "Status",
				label: "Status"
			},
			{
				key: "Users",
				label: "Users"
			},
			{
				key: "Completion",
				label: "Completion"
			},
			{
				key: "Actions",
				label: "Actions"
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
				/>
			</Container>
		</>
	)
}

export default AdminTable;