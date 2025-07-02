// Libraries
import { Col, Row } from "antd";

// Components
import AnalyticsChart from "../components/chart/AnalyticsChart";

const AnalyticsPage: React.FC = () => {

  return (
    <div style={{ maxWidth: '75vw', margin: 'auto' }}>
      <Row gutter={[24, 24]} style={{ padding: 24 }}>
        {[ 'Team', 'Type' ].map(model => (
          <Col key={model} xs={24} xl={12}>
            <AnalyticsChart model={model}/>
          </Col>
          ))}
      </Row>
    </div>
  );

};

export default AnalyticsPage;

