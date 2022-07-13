import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Avatar, Button, Divider, Grid, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import RefreshIcon from '@mui/icons-material/Refresh';

//Core component
import Table from "components/Table/Table.jsx";
import NoInformation from "components/Text/NoInformation";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";
import ReactNumberFormat from 'react-number-format';
import StatisticHeader from "components/Headers/StatisticHeader";
import NTASelectField from "components/Form/NTASelectField";
import NTAChipSelectField from "components/Form/NTAChipSelectField";
import NTATextField from "components/Form/NTATextField";
import NTALoading from "nta-team/nta-loading/Loading";
import { ViewPayment } from "crud/payment";
import { DeletePayment } from "crud/payment";

//Hooks
import useSyllabusList from "hooks/syllabus/useSyllabusList";
import useFilteredPaymentList from "hooks/payment/useFilteredPaymentList";
import usePaymentStatistics from "hooks/payment/usePaymentStatistics";

//Helpers
import { renderPaymentStatus, PAYMENT_STATUSES } from "settings/payment-setting";
import { isAvailableArray } from "helpers/arrayUtils";
import { formatDateTime, datetimeFormatReverseDate } from "helpers/dateUtils";

//other
import componentStyles from "assets/theme/views/admin/tables.js";
import { SORTBY_OPTIONS } from "settings/payment-setting";
import { getSortByLabel } from "settings/payment-setting";
import { LIST_PAYMENT_STATUS } from "settings/payment-setting";

const useStyles = makeStyles(componentStyles);

const getPrice = (syllabus) => {
	const price = syllabus?.price;
	if (!price) return 0;
	if (isNaN(price)) return 0;
	return parseInt(price);
}

const getSyllabusOptions = (syllabusList) => {
	const options = isAvailableArray(syllabusList) ? syllabusList.map(item => ({
		label: item.name,
		value: item.id
	})) : [];

	options.push({ label: "All", value: "" });
	return options;
}

const getPaymentStatusOptions = () => {
	const options = [...LIST_PAYMENT_STATUS];
	options.push({ label: "All", value: "" });
	return options;
}

const Filter = ({
	setFilter,
}) => {

	const { syllabusList } = useSyllabusList();

	const { register, control } = useForm({
		mode: "onSubmit",
		reValidateMode: "onBlur",
		defaultValues: {
			studentName: "",
			syllabusId: "",
			status: "",
			sortBy: "-createdDate",
		},
	});

	const syllabusId = useWatch({ control, name: "syllabusId" });
	const studentName = useWatch({ control, name: "studentName" });
	const status = useWatch({ control, name: "status" });
	const sortBy = useWatch({ control, name: "sortBy" });

	useEffect(() => {
		const filter = {};
		if (syllabusId) {
			filter.SyllabusId = syllabusId;
		}

		if (studentName) {
			filter["Student.Name"] = studentName;
		}

		if (status) {
			filter.Status = status;
		}

		if (sortBy) {
			filter["Sort"] = sortBy;
		}

		setFilter(filter);
	}, [setFilter, sortBy, status, studentName, syllabusId])

	return (
		<Box
			padding="0.5rem 0"
		>
			<Grid
				container
				spacing="1px"
				paddingBottom="0.5rem"
				borderBottom="1px solid rgba(0, 0, 0, 0.05)"
			>
				<Grid item xs={12} lg={4} paddingRight="0">
					<Box
						display="flex"
						width="100%"
					>
						<NTATextField
							label="Find student"
							inputProps={{
								...register("studentName"),
								placeholder: "Search student name"
							}}
						/>
						<Divider
							orientation="vertical"
							variant="middle"
							flexItem
							sx={{ borderColor: "#dadfe1" }}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} lg={4} paddingRight="0">
					<Box
						display="flex"
						width="100%"
					>
						<NTASelectField
							label="Syllabus"
							name="syllabusId"
							options={getSyllabusOptions(syllabusList)}
							control={control}
						/>
						<Divider
							orientation="vertical"
							variant="middle"
							flexItem
							sx={{ borderColor: "#dadfe1" }}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} lg={4} paddingRight="0">
					<NTASelectField
						label="Status"
						name="status"
						options={getPaymentStatusOptions()}
						control={control}
					/>
				</Grid>
			</Grid>
			<Grid
				container
				spacing="1px"
				marginTop="0.5rem"
				justifyContent="flex-end"
			>
				<Grid item xs='auto'>
					<NTAChipSelectField
						label={`Sort by: ${getSortByLabel(sortBy)}`}
						name="sortBy"
						control={control}
						options={SORTBY_OPTIONS}
					/>
				</Grid>

			</Grid>
		</Box>
	)
}

const Payment = () => {
	const classes = useStyles();
	const { statistics } = usePaymentStatistics();

	const [filter, setFilter] = useState({});
	const {
		paymentList,
		loading,
		refresh
	} = useFilteredPaymentList(filter);

	const [columns, setColumns] = useState([]);
	const [openEdit, setOpenEdit] = useState(false);
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
		const handleOpenEdit = (payment) => {
			setSelectedPayment(payment);
			setOpenEdit(true);
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
					const student = row.student;
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
				render: (row) => row.syllabus?.name || <NoInformation text="Syllabus doesn't exist." />
			},
			{
				key: "price",
				label: "Cost",
				render: (row) => (
					<ReactNumberFormat
						displayType="text"
						value={getPrice(row.syllabus) || 0}
						thousandSeparator={true}
						suffix=" ₫"
					/>
				)
			},
			{
				key: "createdDate",
				label: "Created date",
				render: (row) => formatDateTime(row.createdDate, datetimeFormatReverseDate, "") || <NoInformation />
			},
			{
				key: "status",
				label: "Status",
				render: (row) => renderPaymentStatus(row.status)
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
	}, [])

	const handleCloseEdit = () => {
		setOpenEdit(false);
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
					title={"List Payments"}
					columns={columns}
					data={paymentList}
					panel={renderPanel()}
					filter={
						<Filter
							setFilter={setFilter}
						/>
					}
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
		</>
	)
}

export default Payment;