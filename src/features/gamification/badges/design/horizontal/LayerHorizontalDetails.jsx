import React from 'react';

export default function LayerHorizontalDetails({ color }) {
  return (
    <div style={{ position: 'absolute', zIndex: -2 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="220"
        height="220"
        fill="none"
        viewBox="0 0 51 42"
      >
        <path
          fill={color}
          d="M50.1 31.9c0 .5-3.1.5-3.3 1-.2.5 2.3 2.4 2 2.8-.3.4-2.9-1.3-3.3-.9-.4.3.7 3.3.2 3.5-3.2 1.1-7.2-1-10.5-.4s-6.4 3.9-9.7 3.9c-3.3 0-6.4-3.4-9.7-3.9-3.3-.6-7.3 1.6-10.5.4-.5-.2.6-3.1.2-3.5-.4-.3-3 1.3-3.3.9-.3-.4 2.2-2.3 2-2.8-.2-.5-3.3-.5-3.3-1 0-1.8 3.1-3.5 3.1-5.3C4 24.8.9 23.1.9 21.3.9 19.5 4 17.8 4 16 4 14.2.9 12.5.9 10.7c0-.5 3.1-.5 3.3-1 .2-.5-2.3-2.4-2-2.8.3-.4 2.9 1.3 3.3.9.4-.3-.7-3.3-.2-3.5 3.2-1.1 7.2 1 10.5.4S22.2.8 25.5.8c3.3 0 6.4 3.4 9.7 3.9 3.3.6 7.3-1.6 10.5-.4.5.2-.6 3.1-.2 3.5.4.3 3-1.3 3.3-.9.3.4-2.2 2.3-2 2.8.2.5 3.3.5 3.3 1 0 1.8-3.1 3.5-3.1 5.3 0 1.8 3.1 3.5 3.1 5.3 0 1.8-3.1 3.5-3.1 5.3 0 1.8 3.1 3.6 3.1 5.3Z"
        ></path>
        <defs>
          <linearGradient id="SvgjsLinearGradient1011">
            <stop stopColor="#fbc2eb" offset="0"></stop>
            <stop stopColor="#a6c1ee" offset="1"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}