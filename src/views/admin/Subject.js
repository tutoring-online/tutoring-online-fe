import { useEffect, useState } from "react";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

//Core component
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";

//Hooks
import useSubjectList from "hooks/subject/useSubjectList";

import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import { renderSubjectStatus } from "settings/subjectSetting";

import componentStyles from "assets/theme/views/admin/tables.js";
const useStyles = makeStyles(componentStyles);

const Subject = () => {
	const classes = useStyles();
	const subjectList = useSubjectList();
	console.log(subjectList);

	const [columns, setColumns] = useState([]);

	useEffect(() => {
		setColumns([
			{
				key: "code",
				label: "Code",
				render: (row) => row.code
			},
			{
				key: "name",
				label: "Name",
				render: (row) => row.name || <NoInformation />
			},
			{
				key: "description",
				label: "Description",
				render: (row) => row.description || <NoInformation />
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderSubjectStatus(row.status) || <NoInformation />
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
					title={"List Subjects"}
					columns={columns}
					data={subjectList}
				/>
			</Container>
		</>
	)
}

export default Subject;