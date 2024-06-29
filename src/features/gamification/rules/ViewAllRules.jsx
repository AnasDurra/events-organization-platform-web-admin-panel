import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetRulesQuery, useUpdateRuleMutation } from '../gamificationSlice';
import { image } from '../badges/image';
import dayjs from 'dayjs';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form
            form={form}
            component={false}
        >
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input
                    ref={inputRef}
                    onPressEnter={save}
                    onBlur={save}
                />
            </Form.Item>
        ) : (
            <div
                className='editable-cell-value-wrap'
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

export default function ViewAllRules() {
    const navigate = useNavigate();

    const { data: { result: rules } = { result: [] }, isLoading: isRulesLoading } = useGetRulesQuery();
    const [updateRule, { isLoading: isUpdatingRule }] = useUpdateRuleMutation();

    const handleSave = (row) => {
        updateRule({ rule_id: row.id, name: row.name });
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const defaultColumns = [
        {
            title: 'created',
            dataIndex: 'createdAt',
            key: 'name',
            width: '10%',
            render: (date) => dayjs(date).format('YYYY/MM/DD | HH:mm'),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            width: '20%',
            render: (text) => (
                <Input
                    variant='filled'
                    value={text}
                ></Input>
            ),
        },
        {
            title: 'Requirements',
            dataIndex: 'conditions',
            key: 'conditions',
            width: '30%',
            render: (conditions) => {
                return (
                    <div className='text-pretty text-[0.75rem] text-left text-sm flex flex-col justify-center items-start'>
                        {conditions.map((condition, index) => (
                            <span key={index}>{`🔘
     ${condition.definedData.name} ${condition.operator.name} ${condition.value}`}</span>
                        ))}
                    </div>
                );
            },
        },
        {
            title: 'Rewards',
            dataIndex: 'rewards',
            key: 'rewards',
            width: '30%',
            render: (rewards) => {
                return (
                    <div className='flex  space-x-1 items-center '>
                        {console.log('rewa:', rewards)}
                        {rewards.map((reward, index) => {
                            if (reward.type_id == '1') {
                                return (
                                    <img
                                        key={reward.id}
                                        src={`/static/images/points-rp.svg`}
                                        className='w-[1.8rem]'
                                    ></img>
                                );
                            } else if (reward.type_id == '2') {
                                return (
                                    <img
                                        key={index}
                                        src={`data:image/svg+xml;utf8,${encodeURIComponent(reward?.badge?.shape?.svg)}`}
                                        className='w-[1.8rem] -mt-2'
                                        alt={reward.name}
                                    />
                                );
                            } else if (reward.type_id == '3') {
                                return (
                                    <img
                                        key={reward.id}
                                        src={`/static/images/game-point.svg`}
                                        className='w-[1.6rem]'
                                    ></img>
                                );
                            } else return <></>;
                        })}
                    </div>
                );
            },
        },
        {
            title: 'One time rewards',
            dataIndex: 'recurring',
            key: 'activation',
            align: 'center',
            width: '20%',
            render: (val) => <span className='flex justify-center items-center'>{!val ? '✅ ' : '❌ '}</span>,
        },
        {
            title: 'Active',
            dataIndex: 'enabled',
            key: 'activation',
            align: 'center',
            width: '10%',
            render: (val) => <span className='flex justify-center items-center'>{val ? '✅ ' : '❌ '}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            width: '20%',
            render: (_, record) => (
                <Space
                    size='middle'
                    align='center'
                >
                    <a
                        onClick={() => {
                            updateRule({ rule_id: record.id, enabled: !record.enabled });
                        }}
                    >
                        {record.enabled ? 'Deactivate' : 'Activate'}
                    </a>
                    <a
                        onClick={() => {
                            updateRule({ rule_id: record.id, recurring: !record.recurring });
                        }}
                    >
                        {record.recurring ? 'Make rewards one time' : 'disable one time rewards'}
                    </a>
                </Space>
            ),
        },
    ];

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div className='grid grid-cols-12'>
            <div className='col-start-2 col-span-10 flex flex-col w-full space-y-4'>
                <div className='flex space-x-4'>
                    <Button
                        type='primary'
                        onClick={() => {
                            navigate('new');
                        }}
                    >
                        Design new rule
                    </Button>
                </div>
                <Table
                    components={components}
                    columns={columns}
                    dataSource={rules.slice().sort((a, b) => b.id - a.id)}
                    loading={isRulesLoading || isUpdatingRule}
                />
            </div>
        </div>
    );
}
