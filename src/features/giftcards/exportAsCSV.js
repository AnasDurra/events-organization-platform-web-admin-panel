import { message } from 'antd';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import moment from 'moment';

export const downloadCardsAsCSV = ({ selectedRowKeys, cards }) => {
    if (selectedRowKeys.length === 0) {
        message.warning('Please select at least one gift card to export as CSV.');
        return;
    }
    const csvColumns = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Date', dataIndex: 'date' },
        { title: 'Code', dataIndex: 'code' },
        { title: 'Tickets', dataIndex: 'tickets' },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Labels', dataIndex: 'label', render: (labels) => labels.map((label) => label.text).join(', ') },
    ];

    const selectedData = cards.filter((item) => selectedRowKeys.includes(item.key));

    const csvData = selectedData.map((item) => ({
        id: item.id,
        date: moment(item.date, 'M/D/YYYY').format('MM/DD/YYYY'),
        code: item.code,
        tickets: item.tickets,
        status: item.status,
        label: item.label || [],
    }));

    const header = csvColumns.map((column) => column.title).join(',') + '\n';
    const rows = csvData.map((data) => csvColumns.map((column) => `"${data[column.dataIndex]}"`).join(',')).join('\n');

    const csvString = header + rows;

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `giftcards-${dayjs().toISOString()}.csv`);
};
