import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const DateSelector = () => (
  <Space direction="vertical" size={12}>
    <RangePicker />
  </Space>
);

export default DateSelector;