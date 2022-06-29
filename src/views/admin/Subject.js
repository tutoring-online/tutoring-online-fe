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

//Hooks
import useSubjectList from "hooks/subject/useSubjectList";

import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import { renderSubjectStatus, SUBJECT_STATUSES } from "settings/subject-setting";

import componentStyles from "assets/theme/views/admin/tables.js";
import NTALoading from "nta-team/nta-loading/Loading";
import { CreateSubject } from "crud/subject";
import { ViewSubject } from "crud/subject";
import { DeleteSubject } from "crud/subject";

const useStyles = makeStyles(componentStyles);

const Subject = () => {
	const classes = useStyles();
	const {
		subjectList,
		loading,
		refresh
	} = useSubjectList();


	const [columns, setColumns] = useState([]);

	const [openCreate, setOpenCreate] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedSubject, setSelectedSubject] = useState(null);

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
		const handleOpenEdit = (subject) => {
            setSelectedSubject(subject);
            setOpenEdit(true);
        }

        const handleOpenDelete = (subject) => {
            setSelectedSubject(subject);
            setOpenDelete(true);
        }

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
				key: "totalSyllabus",
				label: "Total Syllabuses",
				render: (row) => row.totalSyllabus || 0
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderSubjectStatus(row.status) || <NoInformation />
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
                                    disabled={row.status === SUBJECT_STATUSES.DELETED}
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
		setSelectedSubject(null);
	}

	const handleCloseDelete = () => {
		setOpenDelete(false);
		setSelectedSubject(null);
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
					title={"List Subjects"}
					columns={columns}
					data={subjectList}
					panel={renderPanel()}
				/>
			</Container>

			{openCreate &&
				<CreateSubject
					open={openCreate}
					handleClose={handleCloseCreate}
					setLoadingInfo={setLoadingDetail}
					refresh={refresh}
				/>
			}

			{openEdit &&
				<ViewSubject
					open={openEdit}
					handleClose={handleCloseEdit}
					setLoadingInfo={setLoadingDetail}
					subject={selectedSubject}
					refresh={refresh}
				/>
			}

			{openDelete &&
				<DeleteSubject
					open={openDelete}
					handleClose={handleCloseDelete}
					setLoadingInfo={setLoadingDetail}
					subject={selectedSubject}
					refresh={refresh}
				/>
			}
		</>
	)
}

export default Subject;