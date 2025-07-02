// Libraries
import DayJS from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, Col, Table, Tag } from "antd";
import { PictureOutlined } from '@ant-design/icons';

// Constants
import { EXPENSE_STATUS_TYPE } from "../../constants/expense-status-types";

// Types
import type { ExpenseType } from "../../types/ExpenseType";
import { useEffect, useState } from "react";
import { getDownloadUrl } from "../../utilities/request";

DayJS.extend(relativeTime);

const getStatusColor: (type: string) => string = (type) => {
  switch (type) {
    case EXPENSE_STATUS_TYPE.APPROVED: {
      return 'green';
    }
    case EXPENSE_STATUS_TYPE.REJECTED: {
      return 'red';
    }
    default: {
      return 'orange';
    }
  }
};

const getReferenceDate: (expense: ExpenseType) => string = (expense) => {
  switch (expense.type?.name) {
    case EXPENSE_STATUS_TYPE.APPROVED: {
      return expense.approved_at as string;
    }
    case EXPENSE_STATUS_TYPE.REJECTED: {
      return expense.rejected_at as string;
    }
    default: {
      return expense.approved_at as string;
    }
  }
};

type ExpenseCardProps = {
  expense: ExpenseType;
  onClick: () => void;
};

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onClick }) => {

  const objectKey = expense.attachment || null;
  const [ imageUrl, setImageUrl ] = useState<string>('');

  useEffect(() => {
    if (objectKey) {
      fetchSignedUrl(objectKey);
    }
  }, [ objectKey ]);

  const fetchSignedUrl = (key: string) => {
    try {
      const { data } = getDownloadUrl({ name: key });
      setImageUrl(data.url);
    }
    catch (error) {
      console.log(error);
    }
  };

  const dataSource = [
    {
      key: 'type',
      field: <div style={{ fontWeight: 'semibold' }}>Type</div>,
      value: expense.type?.name,
    },
    {
      key: 'amount',
      field: <div style={{ fontWeight: 'semibold' }}>Amount</div>,
      value: expense.amount,
    },
    {
      key: 'requestor',
      field: <div style={{ fontWeight: 'semibold' }}>Requestor</div>,
      value: expense.requestor?.name,
    },
    {
      key: 'approver',
      field: <div>Approver</div>,
      value: expense.approver?.name,
    },
    {
      key: 'team',
      field: <div style={{ fontWeight: 'semibold' }}>Team</div>,
      value: expense.team?.name,
    },
  ];

  const columns = [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <Col key={expense.id} xs={24} sm={12} md={8} xl={6} xxl={4}>
      <Card
        hoverable
        styles={{ body: { padding: 0 } }}
        onClick={onClick}
      >
        <div style={{
          width: '100%',
          aspectRatio: '1',
          overflow: 'hidden',
          borderRadius: 8,
        }}>
          <Tag
            color={getStatusColor(expense.status?.name as string)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              marginRight: 0,
            }}
          >
            {expense.status?.name} {expense.status?.name === EXPENSE_STATUS_TYPE.PENDING ? 'for' : ''} {DayJS(getReferenceDate(expense)).fromNow(true)} {expense.status?.name === EXPENSE_STATUS_TYPE.PENDING ? '' : 'ago'}
          </Tag>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#CDCDCD' }}>
              <PictureOutlined style={{ fontSize: 150 }}/>
            </div>
          )}
        </div>
        <Card.Meta
          title={expense.name}
          style={{
            padding: 16,
          }}
        />
        <div style={{
            padding: '0px 16px 16px 16px',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <Table
            size="small"
            showHeader={false}
            bordered={true}
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          />
        </div>

      </Card>
    </Col>
  );

};

export default ExpenseCard;
