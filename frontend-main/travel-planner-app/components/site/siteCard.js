import { Card, Button, Rate } from 'antd';
const { Meta } = Card;
const SiteCard = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://edc.nyc/sites/default/files/styles/16x9_md/public/2022-08/Skylines-Bridges-Top-of-the-Rock-Photo-Julienne-Schaer-NYC-and-Company-01.jpg" />}
  >
    <Meta title="Empire State Building"/>
    <Rate disabled defaultValue={2} />
    <p>info-1: ...</p>
    <p>info-2: ...</p>
    <p>info-3: ...</p>
    <Button type="primary">Add</Button>
    {" "}
    <Button type="primary">Remove</Button>
  </Card>
);
export default SiteCard;