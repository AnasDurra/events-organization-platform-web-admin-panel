import { CloseOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Progress, Select, Table, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { BiExport } from 'react-icons/bi';
import { LuGrid } from 'react-icons/lu';
import { MdOutlineFilterAltOff, MdOutlineNewLabel } from 'react-icons/md';
import { PiCardsDuotone } from 'react-icons/pi';
import { Spoiler } from 'spoiled';
import { downloadCardsAsCSV } from './exportAsCSV';
import { downloadCardsAsPDF } from './pritning';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { GrPowerReset } from 'react-icons/gr';
import NewGiftCardsModal from './NewGiftCardsModal';
import { useGetGiftCardsQuery } from './giftcardsSlice';

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export default function GiftCardsTab({ defaultFilters = {}, onGenerateCards }) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [filteredInfo, setFilteredInfo] = useState(defaultFilters);

    const { data: { result: giftcards } = { result: [] }, isLoading: isGiftCardsLoading } = useGetGiftCardsQuery();

    const handleDownloadPDF = async () => {
        setLoading(true);
        await downloadCardsAsPDF({
            cards: giftcards,
            selectedRowKeys: selectedRowKeys,
            onProgressChange: (progress) => setProgress(progress),
        });
        setLoading(false);
    };

    const rowSelection = {
        selectedRowKeys,
        onSelect: (record, selected, selectedRows) => {
            if (selected) {
                setSelectedRowKeys([...selectedRowKeys, record.key]);
            } else {
                setSelectedRowKeys(selectedRowKeys.filter((key) => key !== record.key));
            }
        },
        onSelectAll: (selected) => {
            if (selected) {
                setSelectedRowKeys(filteredData.map((item) => item.key));
            } else {
                setSelectedRowKeys([]);
            }
        },
    };

    const handleClearFilters = () => {
        setFilteredInfo({ status: null, label: null, price: null, date: null });
        setSearchDate([]);
        message.success('filters cleared');
    };

    const getTicketFilters = (data) => {
        const ticketValues = [...new Set(data.map((item) => item.variant.tickets))];
        return ticketValues.map((value) => ({ text: value.toString(), value }));
    };

    const getLabelFilters = (data) => {
        const labelValues = new Set();
        data.forEach((item) => labelValues.add(item.variant.label));
        return Array.from(labelValues).map((value) => ({ text: value, value }));
    };

    const getStatusFilters = () => {
        return [
            { text: 'Available', value: 'Available' },
            { text: 'Redeemed', value: 'Redeemed' },
        ];
    };

    const getPriceFilters = (data) => {
        const priceValues = [...new Set(data.map((item) => item.variant.price))];
        return priceValues.map((value) => ({ text: value.toString(), value }));
    };

    const handleDateFilter = (dates) => {
        setSearchDate(dates);
    };

    const removeFilter = (key) => {
        const newFilters = { ...filteredInfo, [key]: null };
        setFilteredInfo(newFilters);
    };

    const filteredData = searchDate.length
        ? [...giftcards.map((card) => ({ ...card, key: card.id }))].filter((item) => {
              const itemDate = dayjs(item.createdAt);
              return itemDate.isBetween(searchDate[0], searchDate[1], 'day', '[]');
          })
        : [...giftcards.map((card) => ({ ...card, key: card.id }))];

    const handleExportCSV = () => {
        downloadCardsAsCSV({ selectedRowKeys, cards: filteredData });
    };
    const formatCode = (code) => {
        return code.replace(/(.{5})/g, '$1 - ').slice(0, -2);
    };

    useEffect(() => {
        setFilteredInfo(defaultFilters);
    }, [defaultFilters]);
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (date) => dayjs(date).format('YYYY-MM-DD'),
            filterIcon: () => <FilterOutlined className='text-white' />,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <RangePicker
                        onChange={(dates) => setSelectedKeys(dates ? [dates] : [])}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type='primary'
                        onClick={() => {
                            confirm();
                            handleDateFilter(selectedKeys[0]);
                        }}
                        icon={<FilterOutlined />}
                        size='small'
                        style={{ width: '100%', marginBottom: 8 }}
                    >
                        Filter
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters();
                            setSearchDate([]);
                        }}
                        size='small'
                        style={{ width: '100%' }}
                    >
                        Reset
                    </Button>
                </div>
            ),
        },
        {
            title: 'Code',
            dataIndex: 'CODE',
            key: 'code',
            width: '30%',
            render: (code) => (
                <Spoiler
                    density={0.02}
                    revealOn={'click'}
                    accentColor={'black'}
                >
                    {formatCode(code)}
                </Spoiler>
            ),
        },
        {
            title: 'Tickets',
            dataIndex: ['variant', 'tickets'],
            key: 'tickets',
            filters: getTicketFilters(filteredData),
            onFilter: (value, record) => record.variant.tickets === value,
            filterIcon: () => <FilterOutlined className='text-white' />,
            filteredValue: filteredInfo.tickets || null,
        },
        {
            title: 'Pricing',
            dataIndex: ['variant', 'price'],
            key: 'price',
            filters: getPriceFilters(filteredData),
            onFilter: (value, record) => record.variant.price === value,
            filterIcon: () => <FilterOutlined className='text-white' />,
            filteredValue: filteredInfo.price || null,
        },
        {
            title: 'Status',
            dataIndex: 'redeemed',
            key: 'status',
            filters: getStatusFilters(),
            onFilter: (value, record) => {
                if (value === 'Available') return !record.redeemed;
                if (value === 'Redeemed') return record.redeemed;
                return false;
            },
            filterIcon: () => <FilterOutlined className='text-white' />,
            render: (isRedeemed) => {
                return isRedeemed ? <Tag color='success'>Redeemed</Tag> : <Tag color='default'>Available</Tag>;
            },
            filteredValue: filteredInfo.status || null,
        },
        {
            title: 'Collection',
            dataIndex: ['variant', 'label'],
            key: 'collection',
            filters: getLabelFilters(filteredData),
            onFilter: (value, record) => record.variant.label === value,
            filterIcon: () => <FilterOutlined className='text-white' />,
            filteredValue: filteredInfo.label || null,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className='flex items-center space-x-2'>
                    <Button type='link'>deactivate</Button>
                </div>
            ),
        },
    ];

    return (
        <div className='flex flex-col space-y-2'>
            <div className='flex justify-between'>
                <Button
                    type='primary'
                    icon={<PiCardsDuotone />}
                    onClick={onGenerateCards}
                >
                    New Cards
                </Button>
                {console.log(filteredInfo)}
                <div className='flex items-center justify-end space-x-4'>
                    {selectedRowKeys.length !== 0 && (
                        <div
                            onClick={() => setSelectedRowKeys([])}
                            className='hover:cursor-pointer hover:text-white rounded-lg bg-primary/70 text-white p-2 flex justify-center items-center space-x-2'
                        >
                            <div>Selecting: {selectedRowKeys.length}</div>
                            <GrPowerReset className='' />
                        </div>
                    )}

                    <Button
                        type='dashed'
                        icon={<MdOutlineFilterAltOff />}
                        onClick={handleClearFilters}
                    >
                        Clear filters
                    </Button>

                    <Button
                        type='dashed'
                        icon={<LuGrid />}
                        onClick={handleDownloadPDF}
                    >
                        Print Grid
                    </Button>
                    <Button
                        className=''
                        type='dashed'
                        icon={<BiExport />}
                        onClick={handleExportCSV}
                    >
                        Export as CSV
                    </Button>
                </div>
            </div>

            <div className='flex items-center space-x-4 w-full'>
                {Object.keys(filteredInfo).map((key) => {
                    if (filteredInfo[key]) {
                        return (
                            <Tag
                                key={key}
                                closable
                                className=' p-1 bg-primary/70 text-white'
                                closeIcon={
                                    <CloseOutlined style={{ fontSize: '0.85rem', color: 'white' }}> </CloseOutlined>
                                }
                                onClose={() => removeFilter(key)}
                            >
                                <span className='text-[1rem] px-2'>
                                    {key == 'date' ? 'Date' : `${key}:  ${filteredInfo[key]}`}
                                </span>
                            </Tag>
                        );
                    }
                    return null;
                })}
            </div>

            {loading && (
                <div className='flex justify-center items-center'>
                    <div className='flex items-center justify-center space-x-8 w-[80%]'>
                        <div className='w-[70%] text-pretty'>preparing your cards, do NOT change the page...</div>
                        <Progress
                            percent={progress}
                            status='active'
                        />
                    </div>
                </div>
            )}
            <Table
                rowSelection={rowSelection}
                dataSource={filteredData}
                columns={columns}
                pagination={{ pageSizeOptions: [10, 20, 50, 100], showSizeChanger: true }}
                onChange={(pagination, filters) => {
                    setFilteredInfo(filters);
                }}
                size='small'
                loading={isGiftCardsLoading}
            />
        </div>
    );
}
