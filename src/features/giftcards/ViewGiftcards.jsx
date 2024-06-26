import { ConfigProvider, DatePicker, message, Select, Tabs } from 'antd';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;
const { Option } = Select;

import CollectionsTab from './collections/CollectionsTab';
import GiftCardsTab from './GiftCardsTab';

import { HiOutlineCollection } from 'react-icons/hi';
import { IoGift } from 'react-icons/io5';
import { useCreateVariantMutation, useGenerateGiftCardsMutation } from './giftcardsSlice';
import NewGiftCardsModal from './NewGiftCardsModal';

export default function ViewGiftcards() {
    const [isAddCardsModalOpen, setIsAddCardsModalOpen] = useState(false);
    const [modalDefaultExistingCollection, setModalDefaultExistingCollection] = useState(false);
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [selectedCollectionFilters, setSelectedCollectionFilters] = useState([]);

    const [createVariant, { isLoading: isCreateVariantLoading }] = useCreateVariantMutation();
    const [generateGiftCards, { isLoading: isGenerateGiftCardsLoading }] = useGenerateGiftCardsMutation();

    const handleAddCardsFinish = (fields) => {
        if (fields.isNewCollection) {
            createVariant({ ...fields.values, amount: undefined })
                .unwrap()
                .then((res) => {
                    generateGiftCards({ variant_id: res?.result?.id, amount: fields?.values?.amount })
                        .unwrap()
                        .then((e) => {
                            message.success(`New collection ${fields?.values?.label} added successfully`);
                            setIsAddCardsModalOpen(false);
                        })
                        .catch((e) => {
                            message.error('Failed to add a new collection');
                        });
                })
                .catch((e) => {
                    message.error('Failed to add a new collection');
                });
        } else {
            generateGiftCards({ ...fields?.values })
                .unwrap()
                .then((e) => {
                    message.success(`New collection ${fields?.values?.label} added successfully`);
                    setIsAddCardsModalOpen(false);
                })
                .catch((e) => {
                    message.error('Failed to add a new collection');
                });
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <div className='flex justify-center items-center gap-x-1'>
                    <HiOutlineCollection className=''></HiOutlineCollection>
                    Collections
                </div>
            ),
            children: (
                <CollectionsTab
                    onGenerateCards={() => {
                        setModalDefaultExistingCollection(false);
                        setIsAddCardsModalOpen(true);
                    }}
                    showCollection={(collection_name) => {
                        setSelectedCollectionFilters({ collection: [collection_name] });
                        setActiveTabKey('2');
                    }}
                />
            ),
        },
        {
            key: '2',
            label: (
                <div className='flex justify-center items-center gap-x-2'>
                    <IoGift className=''></IoGift>
                    Gift cards
                </div>
            ),
            children: (
                <GiftCardsTab
                    defaultFilters={selectedCollectionFilters}
                    onGenerateCards={() => {
                        setModalDefaultExistingCollection(true);

                        setIsAddCardsModalOpen(true);
                    }}
                ></GiftCardsTab>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        rowSelectedBg: lightenColor('#2B3467', 75),
                        rowSelectedHoverBg: lightenColor('#2B3467', 70),
                    },
                },
            }}
        >
            <div className='grid grid-cols-12'>
                <div className='col-start-2 col-span-10 flex flex-col w-full space-y-4'>
                    <Tabs
                        activeKey={activeTabKey}
                        onChange={(key) => {
                            setActiveTabKey(key);
                        }}
                        items={items}
                    />
                </div>
            </div>
            <NewGiftCardsModal
                defaultIsExistingCollection={modalDefaultExistingCollection}
                onClose={() => setIsAddCardsModalOpen(false)}
                isOpen={isAddCardsModalOpen}
                onFinish={handleAddCardsFinish}
                loading={isGenerateGiftCardsLoading || isCreateVariantLoading}
            />
        </ConfigProvider>
    );
}

function lightenColor(color, amount) {
    const colorValue = color.replace('#', '');
    const num = parseInt(colorValue, 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00ff) + amt;
    const G = (num & 0x0000ff) + amt;
    const newColor = (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
        .toString(16)
        .slice(1);

    return `#${newColor}`;
}
