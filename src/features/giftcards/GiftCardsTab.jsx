import { CloseOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, DatePicker, Progress, Table, Tag, message } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useEffect, useState } from 'react';
import { BiExport } from 'react-icons/bi';
import { GrPowerReset } from 'react-icons/gr';
import { LuGrid } from 'react-icons/lu';
import { MdOutlineFilterAltOff } from 'react-icons/md';
import { PiCardsDuotone } from 'react-icons/pi';
import { Spoiler } from 'spoiled';
import { downloadCardsAsCSV } from './exportAsCSV';
import { useGetGiftCardsQuery, usePrintGiftCardsStreamMutation } from './giftcardsSlice';
import { URL } from '../../api/constants';
import LoadingScreen from './LoadingScreen';

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export default function GiftCardsTab({ defaultFilters = {}, onGenerateCards }) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [filteredInfo, setFilteredInfo] = useState(defaultFilters);

    const { data: { result: giftcards } = { result: [] }, isLoading: isGiftCardsLoading } = useGetGiftCardsQuery();

    const [printGiftCardsStream] = usePrintGiftCardsStreamMutation();

    const downloadGiftCards = async (fileName) => {
        const url = `${URL}/gift-cards/download/${fileName}`;

        try {
            const response = await fetch(url);
            const blob = await response.blob();

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'cards.zip');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            message.destroy();
        } catch (error) {
            message.destroy();
            message.error('Failed to download your giftcards, try again later');
            setLoading(false);
            setProgress(0);
        }
    };
    const handlePrintGrid = () => {
        setLoading(true);
        setProgress(0);
        printGiftCardsStream({
            data: { gift_cards_ids: selectedRowKeys },
            onChunk: (chunk) => {
                console.log(chunk);
                if (chunk) {
                    if (chunk.ack == 'No cards matches the given ids') {
                        setLoading(false);
                        setProgress(0);
                        message.error('Failed to prepare your cards, try again later');
                    } else if (chunk.ack == 'Completed') {
                        setProgress(100);
                        message.loading({
                            content: 'Your cards are ready, your download will start soon..',
                            duration: 5000,
                        });
                        setLoading(false);

                        downloadGiftCards(chunk.fileName);
                    } else if (chunk.ack == 'In Progress') {
                        setProgress(chunk.progress);
                    }
                } else {
                    message.error('Failed to prepare your cards, try again later');
                    setLoading(false);
                    setProgress(0);
                }
            },
        })
            .unwrap()
            .then((chunks) => {})
            .catch((e) => {
                console.log(e);
                message.error('Failed to print giftcards, try again later.');
                setLoading(false);
                setProgress(0);
            });

        /*  setLoading(true);
        await downloadCardsAsPDF({
            cards: giftcards,
            selectedRowKeys: selectedRowKeys,
            onProgressChange: (progress) => setProgress(progress),
        });
        setLoading(false); */
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
                        onClick={handlePrintGrid}
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

            <LoadingScreen
                loading={loading}
                progress={progress}
                initialMessage={['hi']}
            ></LoadingScreen>
            {/*     {loading && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center'>
                        <div className='mb-4 text-xl font-semibold text-gray-700'>
                            Preparing your cards, do <span className='text-red-600 font-bold'>NOT</span> change the
                            page...
                        </div>
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
            )} */}
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
