import { useEffect, useState } from "react";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Avatar, Button, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import RefreshIcon from '@mui/icons-material/Refresh';

//Core component
import Table from "components/Table/Table.jsx";
import StatisticHeader from "components/Headers/StatisticHeader";
import NTALoading from "nta-team/nta-loading/Loading";
import { ViewTutor } from "crud/tutor";
import { DeleteTutor } from "crud/tutor";
import { EditStatus } from "crud/tutor";

//Hooks
import useTutorList from "hooks/tutor/useTutorList";
import useTutorStatistics from "hooks/tutor/useTutorStatistics";

import { renderTutorStatus, TUTOR_STATUSES } from "settings/tutor-setting";
import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";

import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const Tutor = () => {
	const classes = useStyles();
	const {
		tutorList,
		loading,
		refresh
	} = useTutorList();
	const { statistics } = useTutorStatistics();

	const [columns, setColumns] = useState([]);

	const [openEdit, setOpenEdit] = useState(false);
	const [openEditStatus, setOpenEditStatus] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedTutor, setSelectedTutor] = useState(null);

	const [loadingDetail, setLoadingDetail] = useState({
		loading: false,
		text: ""
	});

	useEffect(
		function listenLoadingList() {
			setLoadingDetail({
				loading: loading,
				text: "Loading list..."
			})
		},
		[loading]
	)

	useEffect(() => {
		const handleOpenEdit = (admin) => {
			setSelectedTutor(admin);
			setOpenEdit(true);
		}

		const handleOpenEditStatus = (admin) => {
				setSelectedTutor(admin);
				setOpenEditStatus(true);
			}


		const handleOpenDelete = (admin) => {
			setSelectedTutor(admin);
			setOpenDelete(true);
		}

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
				render: (row) => renderTutorStatus(row.status, () => handleOpenEditStatus(row))
			},
			{
				key: "action",
				label: "Actions",
				render: (row) => (
					<Box
						component="div"
						display="flex"
						alignItems="center"
						columnGap="8px"
						fontSize="13px"
					>
						<BootstrapTooltip title="Detail">
							<span>
								<IconButton
									style={{ padding: 5 }}
									onClick={() => handleOpenEdit(row)}
								>
									<SettingsIcon sx={{ width: 18, height: 18 }} />
								</IconButton>
							</span>
						</BootstrapTooltip>
						<BootstrapTooltip title="Delete">
							<span>
								<IconButton
									style={{ padding: 5 }}
									onClick={() => handleOpenDelete(row)}
									disabled={row.status === TUTOR_STATUSES.DELETED}
								>
									<DeleteForeverIcon sx={{ width: 18, height: 18 }} />
								</IconButton>
							</span>
						</BootstrapTooltip>
					</Box>
				)
			},
		])
	}, [])

	const handleCloseEdit = () => {
		setOpenEdit(false);
		setSelectedTutor(null);
	}

	const handleCloseEditStatus = () => {
		setOpenEditStatus(false);
		setSelectedTutor(null);
	}

	const handleCloseDelete = () => {
		setOpenDelete(false);
		setSelectedTutor(null);
	}

	const renderPanel = () => (
		<Box
			display="flex"
			flexFlow="row nowrap"
			alignItems="center"
			columnGap="0.5rem"
		>
			<NTALoading
				loading={loadingDetail.loading}
				text={loadingDetail.text}
			/>
			<Button
				variant="contained"
				color="primary"
				size="medium"
				onClick={() => refresh && refresh()}
				startIcon={<RefreshIcon fontSize="medium" />}
			>
				Refresh
			</Button>
		</Box>
	)

	return (
		<>
			<StatisticHeader
				statistics={statistics}
				loading={loading}
			/>
			<Container
				maxWidth={false}
				component={Box}
				marginTop="-6rem"
				classes={{ root: classes.containerRoot }}
			>
				<Table
					title={"Tutors"}
					columns={columns}
					data={tutorList}
					panel={renderPanel()}
					loadingData={loading}
				/>
			</Container>

			{openEdit &&
				<ViewTutor
					open={openEdit}
					handleClose={handleCloseEdit}
					setLoadingInfo={setLoadingDetail}
					tutor={selectedTutor}
					refresh={refresh}
				/>
			}

			{openDelete &&
				<DeleteTutor
					open={openDelete}
					handleClose={handleCloseDelete}
					setLoadingInfo={setLoadingDetail}
					tutor={selectedTutor}
					refresh={refresh}
				/>
			}

			{openEditStatus &&
				<EditStatus
					open={openEditStatus}
					handleClose={handleCloseEditStatus}
					tutor={selectedTutor}
					refresh={refresh}
				/>

			}
		</>
	)
}

export default Tutor;