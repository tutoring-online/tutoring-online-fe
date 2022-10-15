import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import ReactNumberFormat from 'react-number-format';

import { Box, Divider } from "@mui/material"

import NTARangeField from "components/Form/NTARangeField";
import NTASelectField from "components/Form/NTASelectField"
import NTAChipSelectField from "components/Form/NTAChipSelectField";

import { isAvailableArray } from "helpers/arrayUtils";
import { DURATION_OPTIONS } from "settings/syllabus-setting";
import { DEFAULT_MAX_PRICE } from "settings/payment-setting";
import yup from "helpers/yupGlobal";

import useCategoryList from "hooks/category/useCategoryList";
import useSubjectList from "hooks/subject/useSubjectList";
import useSyllabusActions from "hooks/syllabus/useSyllabusActions";
import { useCallback } from "react";

const SearchBar = ({ children }) => (
    <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        flexWrap="nowrap"
        width="100%"
        maxWidth="calc(1200px - 6rem)"

        backgroundColor="#fff"
        borderRadius="16px"
        overflow="visible"
        marginTop="1rem"

        position="sticky"
        top="1rem"
    >
        {children}
    </Box>
)

const schema = yup.object().shape({

});

const getCategoryOptions = (categoryList) => {
    const options = isAvailableArray(categoryList) ? categoryList.map(item => ({
        label: item.name,
        value: item.id
    })) : [];
    options.unshift({ label: "All", value: "" })

    return options;
}

const getMaxPrice = () => {
    return DEFAULT_MAX_PRICE;
}

const renderDisplayRange = (value) => {
    if (!isAvailableArray(value)) return;
    const [from, to] = value;
    return (
        <Box>
            <ReactNumberFormat
                displayType="text"
                value={from || 0}
                thousandSeparator={true}
                suffix="₫"
            />
            {` - `}
            <ReactNumberFormat
                displayType="text"
                value={to || 0}
                thousandSeparator={true}
                suffix="₫"
            />
        </Box>
    )
}

const CustomDivider = () => (
    <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ borderColor: "#dadfe1", margin: "16px 0" }}
    />
)

const getDurationOptions = () => {
    const options = [...DURATION_OPTIONS];
    options.unshift({ label: "All", value: "" });
    return options;
}

const sortByOptions = [
    { label: "Popularity", value: "" },
    { label: "Price: highest first", value: "-price" },
    { label: "Price: lowest first", value: "+price" },
    { label: "Duration: highest first", value: "-totalLessons" },
    { label: "Duration: lowest first", value: "+totalLessons" },
]

const getSortByLabel = (value) => {
    const option = sortByOptions.find(item => item.value === value);
    return option?.label || "";
}

export default function SearchBox() {

    const { subjectList } = useSubjectList();
    const { categoryList } = useCategoryList();
    const actions = useSyllabusActions();

    const { control, reset } = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: {
            categoryId: "",
            subjectId: "",
            duration: "",
            sortBy: '',
            price: [0, DEFAULT_MAX_PRICE],
        },
        resolver: yupResolver(schema),
    });

    const categoryId = useWatch({ control, name: "categoryId" });
    const subjectId = useWatch({ control, name: "subjectId" });
    const duration = useWatch({ control, name: "duration" });
    const sortBy = useWatch({ control, name: "sortBy" });
    const price = useWatch({ control, name: "price" });

    const getFilterPayload = useCallback(() => {
        const filter = {
            FromPrice: price ? price[0] : 0,
            ToPrice: price ? price[1] : DEFAULT_MAX_PRICE,
        };

        if (duration) {
            filter.FromTotalLessons = duration;
            filter.ToTotalLessons = duration;
        }

        if (subjectId) {
            filter.SubjectId = subjectId;
        }

        if (sortBy) {
            filter["Sort"] = sortBy;
        }

        return filter;
    }, [duration, price, sortBy, subjectId])

    useEffect(() => {
        const filter = getFilterPayload();
        actions.updateFilter(filter);
    }, [actions, getFilterPayload])

    useEffect(() => {
        const filter = getFilterPayload();
        const { SubjectId, ...others } = filter;
        actions.updateFilter(others);
        reset({
            categoryId,
            subjectId: "",
            duration,
            sortBy,
            price,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    const maxPrice = getMaxPrice();

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const getSubjectOptions = (subjectList) => {
        const options = isAvailableArray(subjectList) ? subjectList
            .filter(item => {
                if (!categoryId) return true;
                return item.categoryId === categoryId;
            })
            .map(item => ({
                label: item.name,
                value: item.id
            })) : [];
        options.unshift({ label: "All", value: "" })

        return options;
    }

    return (
        <Box
            component="div"
            key="home-search-box"
            className={`home-search-box ${inView ? "" : "sticky-search-box"}`}
        >
            <Box
                component="h1"
                className="home-search-box__title"
            >
                Find an online course to help you study
            </Box>
            <Box
                ref={ref}
                component="p"
                className="home-search-box__description"
            >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus.
            </Box>

            <SearchBar>
                <NTASelectField
                    label="Category"
                    name="categoryId"
                    options={getCategoryOptions(categoryList)}
                    control={control}
                />
                <CustomDivider />
                <NTASelectField
                    label="I want to learn"
                    name="subjectId"
                    options={getSubjectOptions(subjectList)}
                    control={control}
                />
                <CustomDivider />
                <NTASelectField
                    label="Duration"
                    name="duration"
                    options={getDurationOptions()}
                    control={control}
                />
                <CustomDivider />
                <NTARangeField
                    label="Price"
                    name="price"
                    max={maxPrice}
                    control={control}
                    renderDisplayRange={renderDisplayRange}
                />
            </SearchBar>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                flexDirection="row"
                flexWrap="nowrap"
                width="100%"
                maxWidth="calc(1200px - 6rem)"
            >
                <NTAChipSelectField
                    label={`Sort by: ${getSortByLabel(sortBy)}`}
                    name="sortBy"
                    control={control}
                    options={sortByOptions}
                />
            </Box>
        </Box>
    )
}