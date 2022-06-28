
//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RefreshIcon from '@mui/icons-material/Refresh';
import makeStyles from '@mui/styles/makeStyles';
import { Avatar, Button, IconButton } from "@mui/material";

//Core component
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";
import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import NTALoading from "nta-team/nta-loading/Loading";
import { ViewAdmin, DeleteAdmin } from "crud/admin";

//Hooks
import useAdminList from "hooks/admin/useAdminList";
import { useEffect, useState } from "react";

import componentStyles from "assets/theme/views/admin/tables.js";
import { renderAdminStatus, ADMIN_STATUSES } from "settings/admin-setting";

const useStyles = makeStyles(componentStyles);

const Admin = () => {
	const classes = useStyles();
	const {
		adminList,
		loading,
		refresh
	} = useAdminList();

	const [columns, setColumns] = useState([]);

	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedAdmin, setSelectedAdmin] = useState(null);

	const [loadingDetail, setLoadingDetail] = useState({
		loading: false,
		text: ""
	});

	useEffect(
		function listenLoadingAdminList() {
			setLoadingDetail({
				loading: loading,
				text: "Loading list..."
			})
		},
		[loading]
	)

	useEffect(
		function configColumns() {

			const handleOpenEdit = (admin) => {
				setSelectedAdmin(admin);
				setOpenEdit(true);
			}

			const handleOpenDelete = (admin) => {
				setSelectedAdmin(admin);
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
					render: (row) => renderAdminStatus(row.status)
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
										disabled={row.status === ADMIN_STATUSES.DELETED}
									>
										<DeleteForeverIcon sx={{ width: 18, height: 18 }} />
									</IconButton>
								</span>
							</BootstrapTooltip>
						</Box>
					)
				},
			])
		},
		[]
	)

	const handleCloseEdit = () => {
		setOpenEdit(false);
		setSelectedAdmin(null);
	}

	const handleCloseDelete = () => {
		setOpenDelete(false);
		setSelectedAdmin(null);
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
			<Header />
			<Container
				maxWidth={false}
				component={Box}
				marginTop="-6rem"
				classes={{ root: classes.containerRoot }}
			>
				<Table
					title={"List Admin Users"}
					columns={columns}
					data={adminList}
					panel={renderPanel()}
				/>
			</Container>

			{openEdit &&
				<ViewAdmin
					open={openEdit}
					handleClose={handleCloseEdit}
					setLoadingInfo={setLoadingDetail}
					admin={selectedAdmin}
					refresh={refresh}
				/>
			}

			{openDelete &&
				<DeleteAdmin
					open={openDelete}
					handleClose={handleCloseDelete}
					setLoadingInfo={setLoadingDetail}
					admin={selectedAdmin}
					refresh={refresh}
				/>
			}
		</>
	)
}

export default Admin;