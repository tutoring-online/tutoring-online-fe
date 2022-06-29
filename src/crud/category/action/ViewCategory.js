import React, { useState } from 'react'
import CategoryDetailDialog from 'crud/category/ui-segment/CategoryDetailDialog';
import useCategoryActions from 'hooks/category/useCategoryActions';
import { toast } from 'react-toastify';
import { CRUD_MODE } from 'settings/setting';
import useCategoryDetail from 'hooks/category/useCategoryDetail';

export default function ViewCategory({
    open,
    handleClose,
    category,
    refresh
}) {
    const actions = useCategoryActions();
    const { categoryDetail, loading, refresh: refreshDetail } = useCategoryDetail(category?.id);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleSubmit = (data, onSuccess) => {
        if (!category?.id || !data) {
            toast.warning("Something went wrong.");
            return;
        }

        const loading = (isLoading) => {
            setLoadingUpdate(Boolean(isLoading));
        }

        const listenUpdateStatus = (updateStatus) => {
            if (updateStatus === true) {
                refresh && refresh();
                onSuccess && onSuccess();
                refreshDetail && refreshDetail();
            }
        }

        actions.updateCategory({ id: category.id, data, loading, callback: listenUpdateStatus });
    }

    return (
        open &&
        <CategoryDetailDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            loadingSubmit={loadingUpdate}
            loadingDetail={loading}

            mode={CRUD_MODE.view}
            category={categoryDetail || category}
            title="Category Detail"
            submitButton={{
                text: "Update"
            }}
        />
    )
}
