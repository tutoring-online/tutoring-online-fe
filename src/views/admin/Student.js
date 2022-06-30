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
import Header from "components/Headers/Header.js";
import Table from "components/Table/Table.jsx";

//Hooks
import useStudentList from "hooks/student/useStudentList";

import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";

import componentStyles from "assets/theme/views/admin/tables.js";
import { renderStudentStatus, STUDENT_STATUSES } from "settings/student-setting";
import NTALoading from "nta-team/nta-loading/Loading";
import { ViewStudent } from "crud/student";
import { DeleteStudent } from "crud/student";
import { EditStatus } from "crud/student";
const useStyles = makeStyles(componentStyles);

const Student = () => {
	const classes = useStyles();
	const {
		studentList,
		loading,
		refresh
	} = useStudentList();

	const [columns, setColumns] = useState([]);

	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openEditStatus, setOpenEditStatus] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState(null);

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
		const handleOpenEdit = (student) => {
			setSelectedStudent(student);
			setOpenEdit(true);
		}

		const handleOpenEditStatus = (student) => {
				setSelectedStudent(student);
				setOpenEditStatus(true);
			}


		const handleOpenDelete = (student) => {
			setSelectedStudent(student);
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
				key: "grade",
				label: "Grade",
				render: (row) => row.grade != null ? row.grade : <NoInformation />
			},
			{
				key: "totalLessons",
				label: (
					<BootstrapTooltip title="Total lessons">
						<div>Lessons</div>
					</BootstrapTooltip>
				),
				render: (row) => row.totalLessons || 0
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
				render: (row) => renderStudentStatus(row.status, () => handleOpenEditStatus(row))
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
									disabled={row.status === STUDENT_STATUSES.DELETED}
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
		setSelectedStudent(null);
	}

	const handleCloseEditStatus = () => {
		setOpenEditStatus(false);
		setSelectedStudent(null);
	}

	const handleCloseDelete = () => {
		setOpenDelete(false);
		setSelectedStudent(null);
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
					title={"List Student Users"}
					columns={columns}
					data={studentList}
					panel={renderPanel()}
					loadingData={loading}
				/>
			</Container>

			{openEdit &&
				<ViewStudent
					open={openEdit}
					handleClose={handleCloseEdit}
					setLoadingInfo={setLoadingDetail}
					student={selectedStudent}
					refresh={refresh}
				/>
			}

			{openDelete &&
				<DeleteStudent
					open={openDelete}
					handleClose={handleCloseDelete}
					setLoadingInfo={setLoadingDetail}
					student={selectedStudent}
					refresh={refresh}
				/>
			}

			{openEditStatus &&
				<EditStatus
					open={openEditStatus}
					handleClose={handleCloseEditStatus}
					student={selectedStudent}
					refresh={refresh}
				/>

			}
		</>
	)
}

export default Student;