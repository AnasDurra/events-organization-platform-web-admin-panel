import React, { useState } from 'react';
import CollectionCard from './CollectionCard';
import NewCollectionCard from './NewCollectionCard';
import NewGiftCardsModal from '../NewGiftCardsModal';
import { useCreateVariantMutation, useGenerateGiftCardsMutation, useGetVariantsQuery } from '../giftcardsSlice';
import { Spin, message } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';

export default function CollectionsTab({ onGenerateCards, showCollection }) {
    const { data: { result: variants } = { result: [] }, isLoading: isVariantsLoading } = useGetVariantsQuery();
    return (
        <>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                <NewCollectionCard onClick={onGenerateCards} />

                {isVariantsLoading && <Spin className='flex justify-center items-center text-lg text-primary '></Spin>}
                {variants.map((variant) => (
                    <CollectionCard
                        key={variant.id}
                        date={variant.createdAt}
                        title={variant.label}
                        numOfCards={variant.giftCards?.length}
                        onClick={() => showCollection(variant.label)}
                    />
                ))}
            </div>
        </>
    );
}
