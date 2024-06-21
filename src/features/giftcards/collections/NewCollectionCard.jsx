import React from 'react';
import { MdOutlineAddToPhotos } from 'react-icons/md';

export default function NewCollectionCard({ onClick }) {
    return (
        <div
            onClick={onClick}
            className='min-h-48 rounded-lg  shadow-md hover:shadow-sm hover:cursor-pointer   p-4 bg-gradient-to-br from-primary/35 via-primary/20 to-primary/5 '
        >
            <div className='flex flex-col justify-center items-center h-full space-y-2 text-primary '>
                <MdOutlineAddToPhotos className='text-[2.5rem] text-primary/60'></MdOutlineAddToPhotos>
                <div>New </div>
            </div>
        </div>
    );
}
