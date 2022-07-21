import React from 'react'
import CategoryDetailDialog from 'crud/category/ui-segment/CategoryDetailDialog';
import useCategoryActions from 'hooks/category/useCategoryActions';
import { CRUD_MODE } from 'settings/setting';

export default function CreateCategory({
    open,
    handleClose,
    setLoadingInfo,
    refresh
}) {
    const actions = useCategoryActions();

    const handleSubmit = (data) => {
        if (!data) return;

        const loading = (isLoading) => {
            setLoadingInfo && setLoadingInfo({
                loading: Boolean(isLoading),
                text: isLoading ? "Creating..." : ""
            })
        }

        const callback = (createStatus) => {
            if (createStatus === true) {
                handleClose && handleClose();
                refresh && refresh();
            }
        }

        actions.createCategory({ data, loading, callback });
    }

    return (
        open &&
        <CategoryDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            mode={CRUD_MODE.create}
            title="Create Category"
            submitButton={{
                text: "Create"
            }}
        />
    )
}
