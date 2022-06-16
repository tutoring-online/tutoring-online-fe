import { useEffect, useState } from "react";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Avatar, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

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
import { renderPaymentStatus } from "settings/paymentSetting";
import { isAvailableArray } from "helpers/arrayUtils";
import { formatDateTime, datetimeFormatReverseDate } from "helpers/dateUtils";

//other
import componentStyles from "assets/theme/views/admin/tables.js";

const useStyles = makeStyles(componentStyles);

const getPrice = (syllabus) => {
	const price = syllabus?.price;
	if (!price) return 0;
	if (isNaN(price)) return 0;
	return parseInt(price);
}

const Payment = () => {
	const classes = useStyles();
	const studentList = useStudentList();
	const syllabusList = useSyllabusList();
	const paymentList = usePaymentList();
	console.log(paymentList);

	const [columns, setColumns] = useState([]);

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
				render: (row) => renderPaymentStatus(row.status) || <NoInformation />
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
	}, [studentList, syllabusList])

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
				/>
			</Container>
		</>
	)
}

export default Payment;