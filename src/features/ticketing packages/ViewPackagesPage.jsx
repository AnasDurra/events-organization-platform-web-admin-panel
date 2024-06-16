import { Button, Empty, Spin } from 'antd';
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
import { TiTicket } from 'react-icons/ti';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

export default function ViewPackagesPage() {
    const { data: { result: packages } = { result: [] }, isLoading: isPackagesLoading } = useGetPackagesQuery();
    const [addNewPackage, { isLoading: isAddPAckageLoading }] = useAddNewPackageMutation();
    const [updatePackage, { isLoading: isUpdatePackageLoading }] = useUpdatePackageMutation();
    const [addPriceToPackage, { isLoading: isAddPriceLoading }] = useAddPriceToPackageMutation();

    const [isNewPackageModalOpen, setIsNewPackageModalOpen] = useState(false);
    const [isEditPackageModalOpen, setIsEditPackageModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isActiveFilter, setIsActiveFilter] = useState(false);

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
            <div className='grid grid-cols-12'>
                <div className=' col-start-2 col-span-10 mb-4'>
                    <div className='flex items-center space-x-4'>
                        <Button
                            type='primary'
                            onClick={handleOpenNewPackageModal}
                        >
                            new package
                        </Button>
                        <div
                            className='flex items-center space-x-2 hover:cursor-pointer'
                            onClick={() => setIsActiveFilter((flag) => !flag)}
                        >
                            <Button
                                type='dashed'
                                className={`${isActiveFilter ? 'bg-green-200 hover:bg-green-200 ' : null}`}
                            >
                                Active
                            </Button>
                            {isActiveFilter && <CloseCircleOutlined />}
                        </div>
                    </div>
                </div>
                <div className='col-start-2 col-span-10 '>
                    <div className='grid grid-cols-4 gap-4'>
                        {packages
                            .filter((pck) => pck.active || !isActiveFilter)
                            .map((pck, idx) => (
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

                    {Array.isArray(packages) && packages.length == 0 && !isPackagesLoading && (
                        <Empty
                            className='mt-[4em]'
                            image={<TiTicket className='w-[5em] text-gray-500'></TiTicket>}
                            description='No packages'
                        />
                    )}
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
