import { useEffect, useState } from "react";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

//Core component
import Table from "components/Table/Table.jsx";
import NTALoading from "nta-team/nta-loading/Loading";

//Hooks

import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import ReactNumberFormat from 'react-number-format';
import componentStyles from "assets/theme/views/admin/tables.js";
import { renderSyllabusStatus } from "settings/syllabus-setting";

import { CreateSyllabus } from "crud/syllabus";
import { ViewSyllabus } from "crud/syllabus";
import { DeleteSyllabus } from "crud/syllabus";
import { EditStatus } from "crud/syllabus";
import StatisticHeader from "components/Headers/StatisticHeader";
import useSyllabusStatistics from "hooks/syllabus/useSyllabusStatistics";
import useFilteredSyllabusList from "hooks/syllabus/useFilteredSyllabusList";
import { SYLLABUS_STATUSES } from "settings/syllabus-setting";
import { SwitchActiveSyllabus } from "crud/syllabus";
import { DeployIcon } from "nta-team/nta-icon";

const useStyles = makeStyles(componentStyles);

const getPrice = (syllabus) => {
	const price = syllabus?.price;
	if (!price) return 0;
	if (isNaN(price)) return 0;
	return parseInt(price);
}

const filter = {
	Sort: "-CreatedDate"
}

const Syllabus = () => {
	const classes = useStyles();
	const {
		syllabusList,
		loading,
		refresh
	} = useFilteredSyllabusList(filter);
	const { statistics } = useSyllabusStatistics();
	const [columns, setColumns] = useState([]);

	const [openCreate, setOpenCreate] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openEditStatus, setOpenEditStatus] = useState(false);
	const [openSwitchActive, setOpenSwitchActive] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedSyllabus, setSelectedSyllabus] = useState(null);

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
		const handleOpenEdit = (syllabus) => {
			setSelectedSyllabus(syllabus);
			setOpenEdit(true);
		}

		const handleOpenSwitchActive = (syllabus) => {
			setSelectedSyllabus(syllabus);
			setOpenSwitchActive(true);
		}

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
				render: (row) => (
					<Box
						display="inline-block"
						width="10px"
						minWidth="300px"
						overflow="hidden"
						whiteSpace="nowrap"
						textOverflow="ellipsis"
					>
						{row.description || <NoInformation />}
					</Box>
				)
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderSyllabusStatus(row.status)
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
						{row.status === SYLLABUS_STATUSES.ACTIVE &&
							<BootstrapTooltip title="Inactive">
								<span>
									<IconButton
										style={{ padding: 5 }}
										onClick={() => handleOpenSwitchActive(row)}
									>
										<DoDisturbAltIcon sx={{ width: 18, height: 18 }} />
									</IconButton>
								</span>
							</BootstrapTooltip>
						}

						{row.status === SYLLABUS_STATUSES.INACTIVE &&
							<BootstrapTooltip title="Active">
								<span>
									<IconButton
										style={{ padding: 5 }}
										onClick={() => handleOpenSwitchActive(row)}
									>
										<DeployIcon width={18} height={18} />
									</IconButton>
								</span>
							</BootstrapTooltip>
						}
					</Box>
				)
			},
		])
	}, [])

	const handleOpenCreate = () => {
		setOpenCreate(true);
	}

	const handleCloseCreate = () => {
		setOpenCreate(false);
	}

	const handleCloseEdit = () => {
		setOpenEdit(false);
		setSelectedSyllabus(null);
	}

	const handleCloseEditStatus = () => {
		setOpenEditStatus(false);
		setSelectedSyllabus(null);
	}

	const handleCloseDelete = () => {
		setOpenDelete(false);
		setSelectedSyllabus(null);
	}

	const handleCloseSwitchActive = () => {
		setOpenSwitchActive(false);
		setSelectedSyllabus(null);
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
			<Button
				variant="contained"
				color="primary"
				size="medium"
				onClick={handleOpenCreate}
				startIcon={<AddBoxIcon fontSize="medium" />}
			>
				Create
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
					title={"List Syllabuses"}
					columns={columns}
					data={syllabusList}
					panel={renderPanel()}
					loadingData={loading}
				/>
			</Container>

			{openCreate &&
				<CreateSyllabus
					open={openCreate}
					handleClose={handleCloseCreate}
					setLoadingInfo={setLoadingDetail}
					refresh={refresh}
				/>
			}

			{openEdit &&
				<ViewSyllabus
					open={openEdit}
					handleClose={handleCloseEdit}
					setLoadingInfo={setLoadingDetail}
					syllabus={selectedSyllabus}
					refresh={refresh}
				/>
			}

			{openDelete &&
				<DeleteSyllabus
					open={openDelete}
					handleClose={handleCloseDelete}
					setLoadingInfo={setLoadingDetail}
					syllabus={selectedSyllabus}
					refresh={refresh}
				/>
			}

			{openSwitchActive &&
				<SwitchActiveSyllabus
					open={openSwitchActive}
					handleClose={handleCloseSwitchActive}
					setLoadingInfo={setLoadingDetail}
					syllabus={selectedSyllabus}
					refresh={refresh}
				/>
			}

			{openEditStatus &&
				<EditStatus
					open={openEditStatus}
					handleClose={handleCloseEditStatus}
					syllabus={selectedSyllabus}
					refresh={refresh}
				/>

			}
		</>
	)
}

export default Syllabus;