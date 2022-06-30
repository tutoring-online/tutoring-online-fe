import { useEffect, useState } from "react";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddBoxIcon from '@mui/icons-material/AddBox';

//Core component
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";
import NTALoading from "nta-team/nta-loading/Loading";

//Hooks
import useSyllabusList from "hooks/syllabus/useSyllabusList";

import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import ReactNumberFormat from 'react-number-format';
import componentStyles from "assets/theme/views/admin/tables.js";
import { renderSyllabusStatus } from "settings/syllabus-setting";
import { SYLLABUS_STATUSES } from "settings/syllabus-setting";
import { CreateSyllabus } from "crud/syllabus";
import { ViewSyllabus } from "crud/syllabus";
import { DeleteSyllabus } from "crud/syllabus";
import { EditStatus } from "crud/syllabus";

const useStyles = makeStyles(componentStyles);

const getPrice = (syllabus) => {
	const price = syllabus?.price;
	if (!price) return 0;
	if (isNaN(price)) return 0;
	return parseInt(price);
}

const Syllabus = () => {
	const classes = useStyles();
	const {
		syllabusList,
		loading,
		refresh
	} = useSyllabusList();


	const [columns, setColumns] = useState([]);

	const [openCreate, setOpenCreate] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openEditStatus, setOpenEditStatus] = useState(false);
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

		const handleOpenEditStatus = (syllabus) => {
				setSelectedSyllabus(syllabus);
				setOpenEditStatus(true);
			}


		const handleOpenDelete = (syllabus) => {
			setSelectedSyllabus(syllabus);
			setOpenDelete(true);
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
				key: "numberOfPurchases",
				label: "N. Purchases",
				render: (row) => row.numberOfPurchases || 0
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderSyllabusStatus(row.status, () => handleOpenEditStatus(row))
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
									disabled={row.status === SYLLABUS_STATUSES.DELETED}
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
					panel={renderPanel()}
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