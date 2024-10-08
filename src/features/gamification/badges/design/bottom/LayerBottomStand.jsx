import React from 'react';

export default function LayerBottomStand({ color }) {
    return (
        <div
            style={{ position: 'absolute', zIndex: 10 }}
            className='mt-[20%]'
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='160'
                height='160'
                fill='none'
                viewBox='0 0 200 200'
            >
                <path
                    fill={color}
                    fillRule='evenodd'
                    d='M169.909 139.373c-8.173-9.433-9.501-24.163-4.077-35.403C170.425 94.452 173 83.777 173 72.5 173 32.46 140.541 0 100.5 0 60.46 0 28 32.46 28 72.5c0 11.022 2.46 21.47 6.86 30.824 5.312 11.293 3.84 26.01-4.425 35.362-10.252 11.602-17.642 25.792-21.063 41.465C7.016 190.942 16.194 200 27.24 200h145.263c11.046 0 20.225-9.057 17.869-19.849-3.355-15.365-10.523-29.306-20.463-40.778Z'
                    clipRule='evenodd'
                ></path>
                <defs>
                    <linearGradient
                        id='paint0_linear_133_29'
                        x1='99.872'
                        x2='99.872'
                        y1='0'
                        y2='200'
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#B8DBFC'></stop>
                        <stop
                            offset='1'
                            stopColor='#F8FBFE'
                        ></stop>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
