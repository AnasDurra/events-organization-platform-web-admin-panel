import { FilterOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, DatePicker, Form, Input, Modal, Progress, Select, Table, Tag, message } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { BiExport } from 'react-icons/bi';
import { LuGrid } from 'react-icons/lu';
import { MdClear, MdOutlineNewLabel } from 'react-icons/md';
import { Spoiler } from 'spoiled';
import { downloadCardsAsCSV } from './exportAsCSV';
import { downloadCardsAsPDF } from './pritning';
const { RangePicker } = DatePicker;
const { Option } = Select;
import { MdOutlineFilterAltOff } from 'react-icons/md';
import { MdOutlineLabelOff } from 'react-icons/md';
import { RestoreOutlined } from '@mui/icons-material';
import { GrPowerReset } from 'react-icons/gr';

const antDesignColors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
];

export default function ViewGiftcards() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [labels, setLabels] = useState({});
    const [form] = Form.useForm();
    const [searchDate, setSearchDate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [filteredInfo, setFilteredInfo] = useState({});

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleDownloadPDF = async () => {
        setLoading(true);
        downloadCardsAsPDF({
            cards: fakeData,
            selectedRowKeys: selectedRowKeys,
            onProgressChange: (progress) => setProgress(progress),
        });
        setLoading(false);
    };
    const handleExportCSV = () => {
        downloadCardsAsCSV({ selectedRowKeys, cards: fakeData });
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleClearFilters = () => {
        setFilteredInfo({ tickets: null, date: null, status: null, label: null });
        setSearchDate([]);
        message.success('filters cleared');
    };

    const generateFakeData = (num) => {
        const statuses = ['Active', 'Redeemed', 'Expired', 'Pending'];
        const fakeData = [];

        for (let i = 1; i <= num; i++) {
            const key = i;
            const date = new Date(
                2023,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
            ).toLocaleDateString();
            const code = (
                Math.random().toString(36).substring(2, 12).toUpperCase() +
                '-' +
                Math.random().toString(36).substring(2, 7).toUpperCase() +
                '-' +
                Math.random().toString(36).substring(2, 7).toUpperCase() +
                '-' +
                Math.random().toString(36).substring(2, 7).toUpperCase()
            ).substring(0, 25);
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const tickets = Math.floor(Math.random() * 2000); // Fixing ticket generation
            const label = labels[key] || [];

            fakeData.push({ key, id: key, date, code, status, tickets, label });
        }

        return fakeData;
    };

    const [fakeData, setFakeData] = useState(generateFakeData(20));

    const handleAddLabel = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Please select at least one gift card to add a label.');
            return;
        }
        setIsModalVisible(true);
    };

    const handleLabelSubmit = (values) => {
        const newLabels = { ...labels };

        selectedRowKeys.forEach((key) => {
            if (!newLabels[key]) newLabels[key] = [];

            // Check if label text already exists
            const existingLabel = newLabels[key].find((label) => label.text === values.label);

            if (existingLabel) {
                // Reuse existing color
                newLabels[key].push({
                    text: values.label,
                    color: existingLabel.color,
                });
            } else {
                // Check if label text exists in any other cards
                let commonColor = null;
                Object.values(newLabels).forEach((labelsForCard) => {
                    const labelWithSameText = labelsForCard.find((label) => label.text === values.label);
                    if (labelWithSameText) {
                        commonColor = labelWithSameText.color;
                    }
                });

                // If label text exists in other cards, use the same color
                if (commonColor) {
                    newLabels[key].push({
                        text: values.label,
                        color: commonColor,
                    });
                } else {
                    // Generate a new color for new labels
                    const color = antDesignColors[Math.floor(Math.random() * antDesignColors.length)];

                    // Use generated color for new label
                    newLabels[key].push({
                        text: values.label,
                        color,
                    });
                }
            }
        });

        setLabels(newLabels);
        setIsModalVisible(false);
        setSelectedRowKeys([]);
        message.success('Label added successfully.');
    };

    const handleRemoveLabel = (key, index) => {
        const newLabels = { ...labels };
        if (newLabels[key]) {
            newLabels[key].splice(index, 1);
            if (newLabels[key].length === 0) delete newLabels[key];
            setLabels(newLabels);
            message.success('Label removed successfully.');
        }
    };

    const getTicketFilters = (data) => {
        const ticketValues = [...new Set(data.map((item) => item.tickets))];
        const filters = ticketValues.map((value) => ({
            text: value.toString(),
            value,
        }));
        return filters;
    };

    const getLabelFilters = (data) => {
        const labelValues = new Set();
        data.forEach((item) => {
            if (labels[item.key]) {
                labels[item.key].forEach((label) => labelValues.add(label.text));
            }
        });
        return Array.from(labelValues).map((value) => ({ text: value, value }));
    };

    const handleDateFilter = (dates) => {
        setSearchDate(dates);
    };

    const filteredData = searchDate.length
        ? fakeData.filter((item) => {
              const itemDate = moment(item.date, 'M/D/YYYY');
              return itemDate.isBetween(searchDate[0], searchDate[1], 'days', '[]');
          })
        : fakeData;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => moment(text, 'M/D/YYYY').format('MM/DD/YYYY'),
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <RangePicker
                        onChange={handleDateFilter}
                        style={{ width: '100%' }}
                    />
                </div>
            ),
            filterIcon: () => <FilterOutlined className='text-white ' />,
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            width: '25%',
            render: (code) => (
                <Spoiler
                    revealOn={'click'}
                    accentColor={'black'}
                >
                    {code}
                </Spoiler>
            ),
        },
        {
            title: 'Tickets',
            dataIndex: 'tickets',
            key: 'tickets',
            filters: getTicketFilters(filteredData),
            onFilter: (value, record) => record.tickets === value,
            filterIcon: () => <FilterOutlined className='text-white' />,
            filteredValue: filteredInfo.tickets || null,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Active', value: 'Active' },
                { text: 'Redeemed', value: 'Redeemed' },
                { text: 'Expired', value: 'Expired' },
                { text: 'Pending', value: 'Pending' },
            ],
            onFilter: (value, record) => record.status === value,
            filterIcon: () => <FilterOutlined className='text-white' />,
            filteredValue: filteredInfo.status || null,
        },
        {
            title: 'Labels',
            dataIndex: 'key',
            key: 'label',
            filters: getLabelFilters(filteredData),
            onFilter: (value, record) => {
                if (labels[record.key]) {
                    return labels[record.key].some((label) => label.text === value);
                }
                return false;
            },
            filterIcon: () => <FilterOutlined className='text-white' />,
            render: (key) =>
                labels[key]
                    ? labels[key]?.map((label, index) => (
                          <Tag
                              key={index}
                              color={label.color}
                              closable
                              onClose={() => handleRemoveLabel(key, index)}
                          >
                              {label.text}
                          </Tag>
                      ))
                    : '',
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
                    <div className='flex items-center justify-end space-x-4'>
                        {selectedRowKeys.length != 0 && (
                            <div className='rounded-lg bg-primary/70 text-white p-2 flex justify-center items-center space-x-2'>
                                <div>Selecting: {selectedRowKeys.length}</div>
                                <GrPowerReset
                                    className='hover:cursor-pointer hover:text-primary/50'
                                    onClick={() => setSelectedRowKeys([])}
                                ></GrPowerReset>
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
                            icon={<MdOutlineNewLabel />}
                            onClick={handleAddLabel}
                        >
                            Add Label
                        </Button>
                        {/*  <Button
                            type='dashed'
                            icon={<MdOutlineLabelOff />}
                        >
                            Remove Labels
                        </Button> */}
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
                            onClick={handleExportCSV} // Call handleExportCSV on click
                        >
                            Export as CSV
                        </Button>
                    </div>
                    {loading && (
                        <div className='flex justify-center items-center'>
                            <div className='flex items-center justify-center space-x-8 w-[80%]'>
                                <div className='w-[70%] text-pretty'>
                                    preparing your cards, do NOT change the page...
                                </div>
                                <Progress
                                    percent={progress}
                                    status='active'
                                />
                            </div>
                        </div>
                    )}
                    <Table
                        rowSelection={rowSelection}
                        dataSource={[...filteredData].sort((a, b) => a.key - b.key)}
                        columns={columns}
                        pagination={{ pageSize: 10 }}
                        onChange={(pagination, filters) => {
                            console.log(filters);
                            setFilteredInfo(filters);
                        }}
                        filters={filteredInfo}
                        size='small'
                    />
                </div>
            </div>
            <Modal
                title='Add Label'
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleLabelSubmit}
                >
                    <Form.Item
                        name='label'
                        rules={[{ required: true, message: 'Please input a label!' }]}
                    >
                        <Input placeholder='Enter label' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            Add Label
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
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
