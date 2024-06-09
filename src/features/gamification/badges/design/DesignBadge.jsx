import React, { useState } from 'react';
import BadgeOverView from './BadgeOverView';
import { BOTTOM_TYPES, CENTER_TYPES, HORIZONTAL_TYPES, DECOR_TYPES } from './constants';
import DesignTools from './DesignTools';
import styles from './paper.module.css';
import { Button, Checkbox, Divider, Input, Space, message } from 'antd';
import { documentToSVG, elementToSVG, inlineResources } from 'dom-to-svg';

export default function DesignBadge({ onFinish }) {
    const [centerLayer, setCenterLayer] = useState(CENTER_TYPES.SHARP_POLY6);
    const [horizontalLayer, setHorizontalLayer] = useState(HORIZONTAL_TYPES.DETAILS);
    const [bottomLayer, setBottomLayer] = useState(BOTTOM_TYPES.WATERFALL);
    const [decorLayer, setDecorLayer] = useState(DECOR_TYPES.GEM);
    const [centerColor, setCenterColor] = useState('#123456');
    const [horizontalColor, setHorizontalColor] = useState('#123456');
    const [bottomColor, setBottomColor] = useState('#123456');
    const [decorColor, setDecorColor] = useState('#123456');
    const [badgeTitle, setBadgeTitle] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const downloadSvg = async () => {
        const svgElement = document.querySelector('#badge-svg');

        if (!svgElement) {
            console.error('SVG element not found');
            return;
        }

        const svgDocument = await elementToSVG(svgElement);
        await inlineResources(svgDocument.documentElement);

        const svgString = new XMLSerializer().serializeToString(svgDocument);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'badge.svg';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleFinishDesign = async () => {
        if (!badgeTitle.trim()) {
            message.error('Badge title is required.');
            return;
        }

        const svgElement = document.querySelector('#badge-svg');

        if (!svgElement) {
            console.error('SVG element not found');
            return;
        }

        const svgDocument = await elementToSVG(svgElement);
        await inlineResources(svgDocument.documentElement);

        const svgString = new XMLSerializer().serializeToString(svgDocument);
        onFinish({ title: badgeTitle, svg: svgString, isActive, isAnonymous });
    };

    return (
        <div className='w-full h-full'>
            <div className='flex items-center w-full h-full justify-evenly'>
                <div className='col-span-1 col-start-4 flex flex-col justify-center items-center'>
                    <Divider>Badge Settings</Divider>
                    <Input
                        placeholder='Badge title'
                        className='w-full'
                        value={badgeTitle}
                        onChange={(e) => setBadgeTitle(e.target.value)}
                        required
                    />
                    <div className='flex justify-start items-center w-full space-x-8 mt-4'>
                        <Checkbox
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        >
                            Active
                        </Checkbox>
                        <Checkbox
                            checked={isAnonymous}
                            onChange={(e) => {
                                setIsAnonymous(e.target.checked);
                            }}
                        >
                            {' '}
                            Anonymous
                        </Checkbox>
                    </div>
                    <DesignTools
                        onCenterChange={(value) => setCenterLayer(value)}
                        onHorizontalChange={(value) => setHorizontalLayer(value)}
                        onBottomChange={(value) => setBottomLayer(value)}
                        onDecorChange={(value) => setDecorLayer(value)}
                        onCenterColorChange={setCenterColor}
                        onHorizontalColorChange={setHorizontalColor}
                        onBottomColorChange={setBottomColor}
                        onDecorColorChange={setDecorColor}
                        layers={{
                            center: centerLayer,
                            horizontal: horizontalLayer,
                            bottom: bottomLayer,
                            decor: decorLayer,
                        }}
                        colors={{
                            center: centerColor,
                            horizontal: horizontalColor,
                            bottom: bottomColor,
                            decor: decorColor,
                        }}
                        onDownloadAsSvg={downloadSvg}
                        onSave={handleFinishDesign}
                    />
                </div>
                <div className={`${styles.paper} h-full w-[50%] min-h-[360px] flex justify-center items-center`}>
                    <BadgeOverView
                        id='badge-svg'
                        layers={{
                            center: centerLayer,
                            horizontal: horizontalLayer,
                            bottom: bottomLayer,
                            decor: decorLayer,
                        }}
                        colors={{
                            center: centerColor,
                            horizontal: horizontalColor,
                            bottom: bottomColor,
                            decor: decorColor,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
