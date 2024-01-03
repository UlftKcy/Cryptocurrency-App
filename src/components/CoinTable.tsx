import Column from "antd/es/table/Column";
import { CoinType } from "../types";
import { Button, Table } from "antd";

export default function CoinTable({ data }: { data: CoinType[] | undefined }) {
  return (
    <Table dataSource={data}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column title="MarketCap" dataIndex="marketcap" key="marketcap" />
      <Column title="24h" dataIndex="change" key="change" />
      <Column
        title="Detail"
        key="detail"
        render={(record: CoinType) => (
          <Button type="link" href={record.uuid}>
            Show Detail
          </Button>
        )}
      />
    </Table>
  );
}
