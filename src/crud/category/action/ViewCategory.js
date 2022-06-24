import React from 'react'
import CategoryDetailDialog from 'crud/category/ui-segment/CategoryDetailDialog';
import useCategoryActions from 'hooks/category/useCategoryActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';

export default function ViewCategory({
    open,
    handleClose,
    setLoadingInfo,
    category,
    refresh
}) {
    const actions = useCategoryActions();

    const handleSubmit = (data) => {
        if (!category?.id || !data) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            setLoadingInfo && setLoadingInfo({
                loading: Boolean(isLoading),
                text: isLoading ? "Updating..." : ""
            })
        }

        const callback = (updateStatus) => {
            if (updateStatus === true) {
                handleClose && handleClose();
                refresh && refresh();
            }
        }

        actions.updateCategory({ id: category.id, data, loading, callback });
    }

    return (
        open &&
        <CategoryDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            category={category}
            mode={CRUD_MODE.view}
            title="Category Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
