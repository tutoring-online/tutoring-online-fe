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
import useCategoryList from "hooks/category/useCategoryList";

import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import { renderCategoryStatus } from "settings/category-setting";

import componentStyles from "assets/theme/views/admin/tables.js";
import NTALoading from "nta-team/nta-loading/Loading";
import { CATEGORY_STATUSES } from "settings/category-setting";
import { ViewCategory, CreateCategory, DeleteCategory } from "crud/category";
import { EditStatus } from "crud/category";

const useStyles = makeStyles(componentStyles);

const Category = () => {
	const classes = useStyles();
	const {
		categoryList,
		loading,
		refresh
	} = useCategoryList();

	const [columns, setColumns] = useState([]);

    const [openCreate, setOpenCreate] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openEditStatus, setOpenEditStatus] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);

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
        const handleOpenEdit = (category) => {
            setSelectedCategory(category);
            setOpenEdit(true);
        }

		const handleOpenEditStatus = (admin) => {
				setSelectedCategory(admin);
				setOpenEditStatus(true);
			}


        const handleOpenDelete = (category) => {
            setSelectedCategory(category);
            setOpenDelete(true);
        }

		setColumns([
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
						minWidth="400px"
						overflow="hidden"
						whiteSpace="nowrap"
						textOverflow="ellipsis"
					>
						{row.description || <NoInformation />}
					</Box>
				)
			},
			{
				key: "totalSubject",
				label: "Total Subjects",
				render: (row) => row.totalSubject || 0
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderCategoryStatus(row.status, () => handleOpenEditStatus(row))
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
                                    disabled={row.status === CATEGORY_STATUSES.DELETED}
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

	const handleCloseEditStatus = () => {
		setOpenEditStatus(false);
		setSelectedCategory(null);
	}

	const handleCloseCreate = () => {
		setOpenCreate(false);
	}

	const handleCloseEdit = () => {
		setOpenEdit(false);
		setSelectedCategory(null);
	}

	const handleCloseDelete = () => {
		setOpenDelete(false);
		setSelectedCategory(null);
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
					title={"List Categories"}
					columns={columns}
					data={categoryList}
                    panel={renderPanel()}
					loadingData={loading}
				/>
			</Container>

            {openCreate &&
				<CreateCategory
					open={openCreate}
					handleClose={handleCloseCreate}
					setLoadingInfo={setLoadingDetail}
					refresh={refresh}
				/>
			}

			{openEdit &&
				<ViewCategory
					open={openEdit}
					handleClose={handleCloseEdit}
					setLoadingInfo={setLoadingDetail}
					category={selectedCategory}
					refresh={refresh}
				/>
			}

			{openDelete &&
				<DeleteCategory
					open={openDelete}
					handleClose={handleCloseDelete}
					setLoadingInfo={setLoadingDetail}
					category={selectedCategory}
					refresh={refresh}
				/>
			}

			{openEditStatus &&
				<EditStatus
					open={openEditStatus}
					handleClose={handleCloseEditStatus}
					category={selectedCategory}
					refresh={refresh}
				/>

			}
		</>
	)
}

export default Category;