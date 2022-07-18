import { isAvailableArray } from "helpers/arrayUtils";
import { useEffect, useState } from "react";


//Icons
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import PieChart from "@mui/icons-material/PieChart";
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { LIST_SUBJECT_STATUS } from "settings/subject-setting";
import { SUBJECT_STATUSES } from "settings/subject-setting";
import useSubjectList from "./useSubjectList";
import { calculatePercentToFix } from "helpers/numberUtils";

const STATISTIC_MODEL = {
    total: {
        label: "Total",
        quantity: 0,
        textColor: "#5e72e4",
        icon: InsertChartOutlined,
    },
    active: {
        ...LIST_SUBJECT_STATUS.find(item => item.value === SUBJECT_STATUSES.ACTIVE),
        quantity: 0,
        icon: PieChart,
    },
    inactive: {
        icon: PauseCircleFilledIcon,
        ...LIST_SUBJECT_STATUS.find(item => item.value === SUBJECT_STATUSES.INACTIVE),
        quantity: 0,
    },
}

const useSubjectStatistics = () => {
    const {
        subjectList,
        loading,
        refresh
    } = useSubjectList();

    const [statistics, setStatistics] = useState(() => {
        return
    });

    useEffect(() => {
        if (!isAvailableArray(subjectList)) {
            setStatistics(Object.keys(STATISTIC_MODEL).map(key => ({
                key,
                ...STATISTIC_MODEL[key]
            })))
        }

        let total = 0;
        let totalActive = 0;
        let totalInactive = 0;

        subjectList.forEach(item => {
            if (item.status === SUBJECT_STATUSES.DELETED) return;

            total += 1;
            if (item.status === SUBJECT_STATUSES.ACTIVE) {
                totalActive += 1;
            }
            if (item.status === SUBJECT_STATUSES.INACTIVE) {
                totalInactive += 1;
            }
        })

        setStatistics([
            {
                key: "total",
                ...STATISTIC_MODEL.total,
                quantity: total,
            },
            {
                key: "active",
                ...STATISTIC_MODEL.active,
                quantity: totalActive,
                percent: calculatePercentToFix(totalActive, total)
            },
            {
                key: "inactive",
                ...STATISTIC_MODEL.inactive,
                quantity: totalInactive,
                percent: calculatePercentToFix(totalInactive, total)
            },
        ]);
    }, [subjectList]);

    return {
        statistics,
        loading,
        refresh
    }
}

export default useSubjectStatistics;