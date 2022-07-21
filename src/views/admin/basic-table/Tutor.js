import { useEffect, useState } from "react";

//MUI
import Box from "@mui/material/Box";
import { Avatar, Button } from "@mui/material";
import EastIcon from '@mui/icons-material/East';

//Core component
import Table from "components/Table/Table.jsx";

//Hooks

import { renderTutorStatus } from "settings/tutor-setting";
import NoInformation from "components/Text/NoInformation";
import useFilteredTutorList from "hooks/tutor/useFilteredTutorList";
import { isAvailableArray } from "helpers/arrayUtils";
import { getFullPath } from "route/routes";
import { useHistory } from "react-router-dom";
import { ROUTES } from "route/routes";

const filter = {
	Sort: "-CreatedDate",
	Page: 0,
	Size: 5
}

const Tutor = () => {
	const history = useHistory();
	const {
		tutorList,
		loading,
		refresh
	} = useFilteredTutorList(filter);
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
				render: (row) => renderTutorStatus(row.status)
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
					history.push(getFullPath(ROUTES.tutor))
				}}
				startIcon={<EastIcon fontSize="medium" />}
			>
				Go to tutor management
			</Button>
		</Box>
	)

	return (
		<>
			<Table
				title={"Tutors"}
				columns={columns}
				data={isAvailableArray(tutorList) ? tutorList.filter((item, index) => index < 5) : []}
				panel={renderPanel()}
				loadingData={loading}
				noPaging={true}
			/>
		</>
	)
}

export default Tutor;