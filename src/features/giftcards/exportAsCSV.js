import { message } from 'antd';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';

export const downloadCardsAsCSV = ({ selectedRowKeys, cards }) => {
    if (selectedRowKeys.length === 0) {
        message.warning('Please select at least one gift card to export as CSV.');
        return;
    }

    const csvColumns = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Date', dataIndex: 'createdAt' },
        { title: 'Code', dataIndex: 'CODE' },
        { title: 'Tickets', dataIndex: ['variant', 'tickets'] },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Labels', dataIndex: ['variant', 'label'] },
    ];

    const selectedData = cards.filter((item) => selectedRowKeys.includes(item.id));

    const csvData = selectedData.map((item) => ({
        id: item.id,
        createdAt: dayjs(item.createdAt).format('MM/DD/YYYY'),
        CODE: item.CODE,
        tickets: item.variant.tickets,
        status: item.redeemed ? 'Redeemed' : 'Available',
        label: item.variant.label,
    }));

    const header = csvColumns.map((column) => column.title).join(',') + '\n';
    const rows = csvData.map((data) => csvColumns.map((column) => `"${data[column.dataIndex]}"`).join(',')).join('\n');

    const csvString = header + rows;

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `giftcards-${dayjs().toISOString()}.csv`);
};
