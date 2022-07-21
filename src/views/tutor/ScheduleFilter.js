import { Box, Divider, Grid } from "@mui/material";
import NTASelectField from "components/Form/NTASelectField";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { LIST_LESSON_STATUS } from "settings/lesson-setting";
import { DATE_SESSION_OPTIONS } from "settings/payment-setting";
import { COMBO_OPTIONS } from "settings/payment-setting";

const getLessonStatusOptions = () => {
    const options = [...LIST_LESSON_STATUS];
    options.unshift({ label: "All", value: "" });
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

export default function ScheduleFilter({
    classOption,
    setClassFilter,
    setLessonFilter
}) {

    const { control } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: {
            paymentId: "",
            combo: "",
            dateSession: "",
            status: "",
        },
    });

    const paymentId = useWatch({ control, name: "paymentId" });
    const combo = useWatch({ control, name: "combo" });
    const dateSession = useWatch({ control, name: "dateSession" });
    const status = useWatch({ control, name: "status" });

    useEffect(() => {
        const classFilter = {};
        const lessonFilter = {};

        if (paymentId) {
            classFilter.PaymentId = classFilter;
        }

        if(combo) {
            classFilter.Combo = combo;
        }

        if(dateSession) {
            classFilter.DateSession = dateSession;
        }

        if (status) {
            lessonFilter.Status = status;
        }

        setClassFilter && setClassFilter(classFilter);
        setLessonFilter && setLessonFilter(lessonFilter);
    }, [combo, dateSession, paymentId, setClassFilter, setLessonFilter, status])

    return (
        <Box
            padding="0"
        >
            <Grid
                container
                columnSpacing="0"
                rowSpacing={1}
                padding="0"
                margin="0"
            >
                <Grid item xs={12} md={6} lg={3}>
                    <Box
                        display="flex"
                        width="100%"
                    >
                        <NTASelectField
                            label="Class"
                            name="paymentId"
                            options={classOption || []}
                            control={control}
                        />
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{ borderColor: "#dadfe1", marginLeft: "16px" }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
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
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{ borderColor: "#dadfe1", marginLeft: "16px" }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
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
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{ borderColor: "#dadfe1", marginLeft: "16px" }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <NTASelectField
                        label="Lesson status"
                        name="status"
                        options={getLessonStatusOptions()}
                        control={control}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}