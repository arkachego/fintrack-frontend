import { Button, Modal } from "antd";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (status: string) => Promise<void>;
};

const ApproveModal: React.FC<Props> = ({ open, onCancel, onSubmit }) => {

  return (
    <Modal
      title="Expense Approval Window"
      closable
      open={open}
      onOk={() => onSubmit('Approved')}
      onCancel={() => onCancel()}
      footer={[
        <Button
          type="primary"
          danger
          onClick={() => onSubmit('Rejected')}
        >
          Reject
        </Button>,
        <Button
          type="primary"
          onClick={() => onSubmit('Approved')}
        >
          Approve
        </Button>,
      ]}
    >
      <p>Please provide the decision to process the expense.</p>
    </Modal>
  );

};

export default ApproveModal;
