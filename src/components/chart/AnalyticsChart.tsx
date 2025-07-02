import { Card, DatePicker, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import DayJS from "dayjs";
import { useAppSelector } from "../../hooks/useRedux";
import { fetchAnalytics } from "../../utilities/request";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const { RangePicker } = DatePicker;

type Props = {
  model: string;
};

const AnalyticsChart: React.FC<Props> = ({ model }) => {

  const currentStamp = DayJS();
  const options = useAppSelector(
    state => model === 'Team'
      ? state.global.options.teams
      : state.global.options.types,
  );
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ reference, setReference ] = useState<string>(options[0].value);
  const [ granularity, setGranularity ] = useState<string>('monthly');
  const [ dateRange, setDateRange ] = useState<string[]>([
    DayJS(currentStamp).subtract(1, 'year').toISOString(),
    currentStamp.toISOString(),
  ]);
  const [ chartData, setChartData ] = useState<any[]>([]);

  useEffect(() => {
    fetchChartData();
  }, [ reference, granularity, dateRange ]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const { data } = await fetchAnalytics({
        [`${model.toLowerCase()}_id`]: reference,
        approved_at: dateRange,
        granularity: granularity,
      });
      setChartData(data);
      setLoading(false);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Card styles={{ body: { padding: 0 } }}>
      <div style={{ padding: 24 }}>
        <Typography.Title level={3} style={{ margin: 0, fontWeight: 'bold' }}>Expense Analytics by {model}s</Typography.Title>
      </div>
      <div style={{ display: 'flex', gap: 24, padding: 24, borderTop: 'thin solid #DEDEDE', borderBottom: 'thin solid #DEDEDE' }}>
        <div style={{ width: 170 }}>
          <Typography style={{ marginBottom: 2, fontWeight: 'bold' }}>{model}</Typography>
          <Select
            value={reference}
            onChange={(value: string) => setReference(value)}
            style={{ width: '100%' }}
            options={options}
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Typography style={{ marginBottom: 2, fontWeight: 'bold' }}>Approval Date Range</Typography>
          <RangePicker
            style={{ width: '100%' }}
            format="DD-MMM-YY"
            value={dateRange.map(date => DayJS(date))}
            onChange={(_, dateStrings: string[]) => setDateRange(dateStrings)}
          />
        </div>
        <div style={{ width: 170 }}>
          <Typography style={{ marginBottom: 2, fontWeight: 'bold' }}>Granularity</Typography>
          <Select
            style={{ width: '100%' }}
            value={granularity}
            onChange={(value: string) => setGranularity(value)}
            options={[{ label: 'Daily', value: 'daily' }, { label: 'Monthly', value: 'monthly' }, { label: 'Yearly', value: 'yearly' }]}
          />
        </div>
      </div>
      <div style={{ padding: 24, height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={`${granularity.toLowerCase()}_id`} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_amount" fill="#1677ff" activeBar={<Rectangle fill="#8884d8" stroke="grey" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );

};

export default AnalyticsChart;
