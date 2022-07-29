import { useEffect, useState } from "react";

//MUI
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import EastIcon from '@mui/icons-material/East';

//Core component
import Table from "components/Table/Table.jsx";
//Hooks

import NoInformation from "components/Text/NoInformation";
import ReactNumberFormat from 'react-number-format';
import { renderSyllabusStatus } from "settings/syllabus-setting";

import useFilteredSyllabusList from "hooks/syllabus/useFilteredSyllabusList";
import { useHistory } from "react-router-dom";
import { getFullPath } from "route/routes";
import { ROUTES } from "route/routes";

const getPrice = (syllabus) => {
	const price = syllabus?.price;
	if (!price) return 0;
	if (isNaN(price)) return 0;
	return parseInt(price);
}

const filter = {
	Sort: "-CreatedDate",
	Page: 0,
	Size: 5
}

const Syllabus = () => {
	const history = useHistory();
	const {
		syllabusList,
		loading,
	} = useFilteredSyllabusList(filter);
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
				key: "status",
				label: "Status",
				render: (row) => renderSyllabusStatus(row.status)
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
					history.push(getFullPath(ROUTES.syllabus))
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
				title={"New syllabuses"}
				columns={columns}
				data={syllabusList}
				panel={renderPanel()}
				loadingData={loading}
				noPaging={true}
			/>
		</>
	)
}

export default Syllabus;