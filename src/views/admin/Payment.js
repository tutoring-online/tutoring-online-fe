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
import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import ReactNumberFormat from 'react-number-format';

//Hooks
import usePaymentList from "hooks/payment/usePaymentList";
import useStudentList from "hooks/student/useStudentList";
import useSyllabusList from "hooks/syllabus/useSyllabusList";

//Helpers
import { renderPaymentStatus,PAYMENT_STATUSES } from "settings/payment-setting";
import { isAvailableArray } from "helpers/arrayUtils";
import { formatDateTime, datetimeFormatReverseDate } from "helpers/dateUtils";

//other
import componentStyles from "assets/theme/views/admin/tables.js";
import NTALoading from "nta-team/nta-loading/Loading";
import { ViewPayment } from "crud/payment";
import { DeletePayment } from "crud/payment";
import { EditStatus } from "crud/payment";

const useStyles = makeStyles(componentStyles);

const getPrice = (syllabus) => {
	const price = syllabus?.price;
	if (!price) return 0;
	if (isNaN(price)) return 0;
	return parseInt(price);
}

const Payment = () => {
	const classes = useStyles();
	const { studentList } = useStudentList();
	const { syllabusList } = useSyllabusList();
	const {
        paymentList,
        loading,
        refresh
    } = usePaymentList();

	const [columns, setColumns] = useState([]);
	const [openEdit, setOpenEdit] = useState(false);
	const [openEditStatus, setOpenEditStatus] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState(null);

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
		const getStudentById = (studentId) => {
			const student = isAvailableArray(studentList) &&
				studentList.find(item => item.id === studentId);
			return student || null;
		}

		const getSyllabusById = (syllabusId) => {
			const syllabus = isAvailableArray(syllabusList) &&
				syllabusList.find(item => item.id === syllabusId);
			return syllabus || null;
		}

		const handleOpenEdit = (payment) => {
            setSelectedPayment(payment);
            setOpenEdit(true);
        }

		const handleOpenEditStatus = (payment) => {
			setSelectedPayment(payment);
				setOpenEditStatus(true);
			}


        const handleOpenDelete = (payment) => {
            setSelectedPayment(payment);
            setOpenDelete(true);
        }

		setColumns([
			{
				key: "studentId",
				label: "Student",
				render: (row) => {
					const student = getStudentById(row.studentId);
					return !student ?
						<NoInformation text="Student doesn't exist." />
						: (
							<Box
								display="flex"
								alignItems="center"
							>
								<Box
									component={Avatar}
									marginRight="1rem"
									alt="avatar"
									src={student.avatarURL}
									sx={{ width: 32, height: 32 }}
								/>
								{student.name || <NoInformation />}
							</Box>
						)
				}
			},
			{
				key: "syllabusName",
				label: "Syllabus",
				render: (row) => getSyllabusById(row.syllabusId)?.name || <NoInformation text="Syllabus doesn't exist." />
			},
			{
				key: "price",
				label: "Cost",
				render: (row) => (
					<ReactNumberFormat
						displayType="text"
						value={getPrice(getSyllabusById(row.syllabusId)) || 0}
						thousandSeparator={true}
						suffix=" ₫"
					/>
				)
			},
			{
				key: "createdDate",
				label: "Order's date",
				render: (row) => formatDateTime(row.createdDate, datetimeFormatReverseDate, "") || <NoInformation />
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderPaymentStatus(row.status, () => handleOpenEditStatus(row))
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
									disabled={row.status === PAYMENT_STATUSES.DELETED}
								>
									<DeleteForeverIcon sx={{ width: 18, height: 18 }} />
								</IconButton>
							</span>
						</BootstrapTooltip>
					</Box>
				)
			},
		])
	}, [studentList, syllabusList])

	const handleCloseEdit = () => {
		setOpenEdit(false);
		setSelectedPayment(null);
	}

	const handleCloseEditStatus = () => {
		setOpenEditStatus(false);
		setSelectedPayment(null);
	}

	const handleCloseDelete = () => {
		setOpenDelete(false);
		setSelectedPayment(null);
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
					title={"List Payments"}
					columns={columns}
					data={paymentList}
					panel={renderPanel()}
					loadingData={loading}
				/>
			</Container>

			{openEdit &&
				<ViewPayment
					open={openEdit}
					handleClose={handleCloseEdit}
					setLoadingInfo={setLoadingDetail}
					payment={selectedPayment}
					refresh={refresh}
				/>
			}

			{openDelete &&
				<DeletePayment
					open={openDelete}
					handleClose={handleCloseDelete}
					setLoadingInfo={setLoadingDetail}
					payment={selectedPayment}
					refresh={refresh}
				/>
			}

			{openEditStatus &&
				<EditStatus
					open={openEditStatus}
					handleClose={handleCloseEditStatus}
					payment={selectedPayment}
					refresh={refresh}
				/>

			}
		</>
	)
}

export default Payment;