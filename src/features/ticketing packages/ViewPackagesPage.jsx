import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import NewPackageModal from './modal-new-package';
import PackageCard from './PackageCard';
import {
    useAddNewPackageMutation,
    useAddPriceToPackageMutation,
    useGetPackagesQuery,
    useUpdatePackageMutation,
} from './TicketingPackagesSlice';
import { useNotification } from '../../utils/useAntNotification';
import EditPackageModal from './modal-edit-package';

export default function ViewPackagesPage() {
    const { data: { result: packages } = { result: [] }, isLoading: isPackagesLoading } = useGetPackagesQuery();
    const [addNewPackage, { isLoading: isAddPAckageLoading }] = useAddNewPackageMutation();
    const [updatePackage, { isLoading: isUpdatePackageLoading }] = useUpdatePackageMutation();
    const [addPriceToPackage, { isLoading: isAddPriceLoading }] = useAddPriceToPackageMutation();

    const [isNewPackageModalOpen, setIsNewPackageModalOpen] = useState(false);
    const [isEditPackageModalOpen, setIsEditPackageModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const { openNotification } = useNotification();

    const handleOpenNewPackageModal = () => setIsNewPackageModalOpen(true);
    const handleCancelNewPackageModal = () => setIsNewPackageModalOpen(false);
    const handleNewPackageModalFinish = (values) => {
        addNewPackage(values).then((response) => {
            if (response.error) {
                openNotification({
                    type: 'error',
                    message: 'failed to create new package',
                    description: 'try again later',
                    placement: 'bottomRight',
                });
            } else {
                openNotification({ type: 'success', message: 'Package created', placement: 'bottomRight' });
                setIsNewPackageModalOpen(false);
            }
        });
    };
    const handleOpenEditPackageModal = () => setIsEditPackageModalOpen(true);
    const handleCancelEditPackageModal = () => setIsEditPackageModalOpen(false);
    const handleEditPackageModalFinish = async (values) => {
        let newDefaultPrice = undefined;
        if (values.price && values.price != selectedPackage.default_price?.unit_amount / 100) {
            await addPriceToPackage({ price: values.price, package_id: selectedPackage.id }).then((response) => {
                console.log(response);
                if (response.error) {
                    openNotification({
                        type: 'error',
                        message: 'failed to update package Price',
                        description: 'try again later',
                        placement: 'bottomRight',
                    });
                    return false;
                } else newDefaultPrice = response?.data?.result?.id;

                console.log(newDefaultPrice);
            });
        }

        updatePackage({ ...values, price: undefined, default_price: newDefaultPrice }).then((response) => {
            console.log(newDefaultPrice);

            if (response.error) {
                openNotification({
                    type: 'error',
                    message: 'failed to update package',
                    description: 'try again later',
                    placement: 'bottomRight',
                });
            } else {
                openNotification({ type: 'success', message: 'Package updated', placement: 'bottomRight' });
                setIsEditPackageModalOpen(false);
            }
        });
    };
    return (
        <Spin
            spinning={isPackagesLoading}
            className='flex h-[100svh] items-center justify-center'
        >
            <div className='grid grid-cols-10'>
                <div className='col-start-1 col-span-8 grid grid-cols-4 gap-4'>
                    <div className='col-start-4 flex justify-center'>
                        <Button
                            type='primary'
                            onClick={handleOpenNewPackageModal}
                        >
                            new package
                        </Button>
                    </div>

                    {packages.map((pck, idx) => (
                        <PackageCard
                            key={'package_' + idx}
                            name={pck.name}
                            status={pck.active ? 'Active' : 'Archived'}
                            price={pck.default_price?.unit_amount / 100}
                            tickets={pck.metadata.value}
                            onClick={() => {
                                setSelectedPackage(pck);
                                setIsEditPackageModalOpen(true);
                            }}
                        />
                    ))}
                </div>
            </div>
            <NewPackageModal
                isOpen={isNewPackageModalOpen}
                onFinish={handleNewPackageModalFinish}
                onCancel={handleCancelNewPackageModal}
                isLoading={isAddPAckageLoading}
            />

            <EditPackageModal
                isOpen={isEditPackageModalOpen}
                onFinish={handleEditPackageModalFinish}
                onCancel={handleCancelEditPackageModal}
                isLoading={isAddPriceLoading || isUpdatePackageLoading}
                pckg={selectedPackage}
            />
        </Spin>
    );
}
