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
import useSyllabusList from "hooks/syllabus/useSyllabusList";

import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import ReactNumberFormat from 'react-number-format';
import componentStyles from "assets/theme/views/admin/tables.js";
import { renderSyllabusStatus } from "settings/syllabusSetting";

const useStyles = makeStyles(componentStyles);

const getPrice = (syllabus) => {
	const price = syllabus?.price;
	if (!price) return 0;
	if (isNaN(price)) return 0;
	return parseInt(price);
}

const Syllabus = () => {
	const classes = useStyles();
	const syllabusList = useSyllabusList();
	console.log(syllabusList);

	const [columns, setColumns] = useState([]);

	useEffect(() => {
		setColumns([
			{
				key: "name",
				label: "Name",
				render: (row) => row.name || <NoInformation />
			},
			{
				key: "price",
				label: "Price",
				render: (row) => (
					<ReactNumberFormat
						displayType="text"
						value={getPrice(row) || 0}
						thousandSeparator={true}
						suffix=" ₫"
					/>
				)
			},
			{
				key: "description",
				label: "Description",
				render: (row) => row.description || <NoInformation />
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderSyllabusStatus(row.status) || <NoInformation />
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
					title={"List Syllabuses"}
					columns={columns}
					data={syllabusList}
				/>
			</Container>
		</>
	)
}

export default Syllabus;