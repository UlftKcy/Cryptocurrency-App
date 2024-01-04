import Column from "antd/es/table/Column";
import { CoinType } from "../types";
import { Button, Flex, Image, Space, Table } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { addFavorite } from "../features/coins/coinSlice";

export default function CoinTable({ data }: { data: CoinType[] | undefined }) {
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const addFavoriteCoin = (uuid: string) => {
    const coins = favoriteCoins.includes(uuid) ? favoriteCoins.filter((coin) => coin !== uuid) : [...favoriteCoins, uuid];
    setFavoriteCoins(coins);
    dispatch(addFavorite(uuid));
  };

  return (
    <Table dataSource={data}>
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(_: undefined, record: CoinType) => (
          <Space align="center" size="middle">
            <Button
              danger
              style={{ border: 0 }}
              onClick={() => addFavoriteCoin(record.uuid)}
              icon={
                favoriteCoins.includes(record.uuid) ? (
                  <HeartFilled />
                ) : (
                  <HeartOutlined />
                )
              }
            />
            <Image src={record.iconUrl} width={25} height={25} />
            <Flex vertical>
              <h4 style={{ fontWeight: "bold" }}>{record.name}</h4>
              <span>{record.symbol}</span>
            </Flex>
          </Space>
        )}
      />
      <Column
        title="Price"
        dataIndex="price"
        key="price"
        render={(_: undefined, record: CoinType) => (
          <span style={{ fontWeight: "bold" }}>
            $ {Number(record.price).toFixed(2)}
          </span>
        )}
      />
      <Column
        title="MarketCap"
        dataIndex="marketCap"
        key="marketCap"
        render={(_: undefined, record: CoinType) => (
          <span>
            $ {(Number(record.marketCap) / 1000000000).toFixed(2)} billion
          </span>
        )}
      />
      <Column
        title="24h"
        dataIndex="change"
        key="change"
        render={(_: undefined, record: CoinType) => {
          const styleChange = {
            color: Number(record.change) > 0 ? "green" : "red",
          };
          return <span style={styleChange}>{record.change} %</span>;
        }}
      />
      <Column
        title="Detail"
        key="detail"
        render={(record: CoinType) => (
          <Button type="link" href={record.uuid} style={{ paddingLeft: 0 }}>
            Show Detail
          </Button>
        )}
      />
    </Table>
  );
}