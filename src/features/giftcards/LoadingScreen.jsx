import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';

const LoadingScreen = ({ loading, progress, initialMessage }) => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [message, setMessage] = useState(initialMessage);

    const messages = [`${message}, please wait...`, `${message}, almost there...`, `${message}, hang tight...`];

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
            }, 2000); 

            return () => clearInterval(interval);
        }
    }, [loading, messages.length]);

    return (
        loading && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center'>
                    <div className='mb-4 text-xl font-semibold text-gray-700'>{messages[messageIndex]}</div>
                    <Progress
                        percent={progress}
                        status='active'
                        className='w-full'
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                    />
                </div>
            </div>
        )
    );
};

export default LoadingScreen;
