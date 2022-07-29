import { Box, Chip, CircularProgress, Divider } from "@mui/material";
import NTASelectField from "components/Form/NTASelectField";
import { isAvailableArray } from "helpers/arrayUtils";
import useAllTutorClasses from "hooks/tutor/useAllTutorClasses";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { LESSON_STATUSES } from "settings/lesson-setting";
import { LIST_LESSON_STATUS } from "settings/lesson-setting";
import { DATE_SESSION_OPTIONS } from "settings/payment-setting";
import { COMBO_OPTIONS } from "settings/payment-setting";

const getLessonStatusOptions = () => {
    const options = [...LIST_LESSON_STATUS];
    return options;
}

const getComboOptions = () => {
    const options = COMBO_OPTIONS.map(item => ({
        ...item,
        label: item.text,
        render: item.label
    }));
    options.unshift({ label: "All", value: "", render: "All" });
    return options;
}

const getDateSessionOptions = () => {
    const options = DATE_SESSION_OPTIONS.map(item => ({
        ...item,
        label: item.text,
        render: item.label
    }));
    options.unshift({ label: "All", value: "", render: "All" });
    return options;
}

const customRenderOptions = (props, option) => (
    <li {...props} key={option.value}>
        {option.render}
    </li>
);

const getClassOptions = (classes) => {
    const options = [{ label: "All", value: "" }];
    if (isAvailableArray(classes)) {
        const temp = classes.map(classItem => ({
            ...classItem,
            label: `Code: ${classItem.id} - Subject: ${classItem.syllabus?.name}`,
            value: classItem.id
        }))
        options.push(...temp);
    }

    return options;
}

const CustomDivider = () => (
    <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ borderColor: "#dadfe1", margin: "16px 0" }}
    />
)

const SearchBar = ({ children }) => (
    <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        flexWrap="nowrap"
        width="100%"

        backgroundColor="#fff"
        borderRadius="16px"
        overflow="visible"
    >
        {children}
    </Box>
)

export default function ScheduleFilter({
    loading,
    detailedLessons,
    setClassFilter,
    setLessonFilter
}) {

    const user = useSelector(state => state.auth.user);
    const classes = useAllTutorClasses(user?.id);

    const { control } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: {
            paymentId: "",
            combo: "",
            dateSession: "",
            status: LESSON_STATUSES.PENDING,
        },
    });

    const paymentId = useWatch({ control, name: "paymentId" });
    const combo = useWatch({ control, name: "combo" });
    const dateSession = useWatch({ control, name: "dateSession" });
    const status = useWatch({ control, name: "status" });

    useEffect(() => {
        const lessonFilter = {};

        if (status) {
            lessonFilter.Status = status;
        }

        setLessonFilter && setLessonFilter(lessonFilter);
    }, [setLessonFilter, status])

    useEffect(() => {
        const classFilter = {};

        if (user?.id) {
            classFilter.TutorId = user.id;
        }

        if (paymentId) {
            classFilter.Id = paymentId;
        }

        if (dateSession) {
            classFilter.DateSession = dateSession;
        }


        if (combo) {
            classFilter.Combo = combo;
        }

        setClassFilter && setClassFilter(classFilter);
    }, [combo, dateSession, paymentId, setClassFilter, user])


    return (
        <Box
            padding="0"
            display="flex"
            flexDirection="column"
        >
            <SearchBar>
                <Box
                    display="flex"
                    width="100%"
                >
                    <NTASelectField
                        label="Class"
                        name="paymentId"
                        options={getClassOptions(classes) || []}
                        control={control}
                    />
                </Box>
                <CustomDivider />
                <Box
                    display="flex"
                    width="100%"
                >
                    <NTASelectField
                        label="Combo"
                        name="combo"
                        options={getComboOptions()}
                        renderOption={customRenderOptions}
                        control={control}
                    />
                </Box>
                <CustomDivider />
                <Box
                    display="flex"
                    width="100%"
                >
                    <NTASelectField
                        label="Date Session"
                        name="dateSession"
                        options={getDateSessionOptions()}
                        renderOption={customRenderOptions}
                        control={control}
                    />
                </Box>
                <CustomDivider />
                <NTASelectField
                    label="Lesson status"
                    name="status"
                    options={getLessonStatusOptions()}
                    control={control}
                />
            </SearchBar>

            <Divider
                orientation="horizontal"
                flexItem
                sx={{
                    borderColor: "#dadfe1",
                }}
            />

            <Box
                padding="0 1rem"
                paddingTop="0.5rem"
                fontSize="14px"
                color="#8898aa"
                minHeight="40px"
            >
                {loading ?
                    <CircularProgress
                        size={26}
                        thickness={4}
                    />
                    :
                    <Chip
                        label={`Result: ${isAvailableArray(detailedLessons) ? detailedLessons.length : 0} lessons`}
                    />
                }
            </Box>
        </Box>
    )
}