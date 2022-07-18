import { isAvailableArray } from "helpers/arrayUtils";
import { useEffect, useState } from "react";

//Icons
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import PieChart from "@mui/icons-material/PieChart";
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { LIST_SYLLABUS_STATUS } from "settings/syllabus-setting";
import { SYLLABUS_STATUSES } from "settings/syllabus-setting";
import useSyllabusList from "./useSyllabusList";
import { calculatePercentToFix } from "helpers/numberUtils";

const STATISTIC_MODEL = {
    total: {
        label: "Total",
        quantity: 0,
        textColor: "#5e72e4",
        icon: InsertChartOutlined,
    },
    active: {
        ...LIST_SYLLABUS_STATUS.find(item => item.value === SYLLABUS_STATUSES.ACTIVE),
        quantity: 0,
        icon: PieChart,
    },
    inactive: {
        icon: PauseCircleFilledIcon,
        ...LIST_SYLLABUS_STATUS.find(item => item.value === SYLLABUS_STATUSES.INACTIVE),
        quantity: 0,
    }
}

const useSyllabusStatistics = () => {
    const {
        syllabusList,
        loading,
        refresh
    } = useSyllabusList();

    const [statistics, setStatistics] = useState(() => {
        return
    });

    useEffect(() => {
        if (!isAvailableArray(syllabusList)) {
            setStatistics(Object.keys(STATISTIC_MODEL).map(key => ({
                key,
                ...STATISTIC_MODEL[key]
            })))
        }

        let total = 0;
        let totalActive = 0;
        let totalInactive = 0;

        syllabusList.forEach(item => {
            if (item.status === SYLLABUS_STATUSES.DELETED) return;

            total += 1;
            if (item.status === SYLLABUS_STATUSES.ACTIVE) {
                totalActive += 1;
            }
            if (item.status === SYLLABUS_STATUSES.INACTIVE) {
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
            }
        ]);
    }, [syllabusList]);

    return {
        statistics,
        loading,
        refresh
    }
}

export default useSyllabusStatistics;