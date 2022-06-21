
//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddBoxIcon from '@mui/icons-material/AddBox';
//Core component
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";

//Hooks
import useAdminList from "hooks/admin/useAdminList";

import componentStyles from "assets/theme/views/admin/tables.js";
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import NoInformation from "components/Text/NoInformation";
import { renderAdminStatus } from "settings/adminSetting";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import NTALoading from "nta-team/nta-loading/Loading";
import { CreateAdmin } from "crud/admin";

const useStyles = makeStyles(componentStyles);

const Admin = () => {
	const classes = useStyles();
	const {
		adminList,
		loading,
		refresh
	} = useAdminList();

	const [columns, setColumns] = useState([]);
	const [openCreate, setOpenCreate] = useState(false);

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
							{admin.name || <NoInformation />}
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
		},
		[]
	)

	const handleOpenCreate = () => {
		setOpenCreate(true);
	}

	const handleCloseCreate = () => {
		setOpenCreate(false);
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
					title={"List Admin Users"}
					columns={columns}
					data={adminList}
					panel={renderPanel()}
				/>
			</Container>

			{openCreate &&
				<CreateAdmin
					open={openCreate}
					handleClose={handleCloseCreate}
				/>
			}
		</>
	)
}

export default Admin;