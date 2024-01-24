import Column from "antd/es/table/Column";
import { CoinType } from "../../../types";
import { Button, Flex, Image, Space, Table, Tag } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { addFavorite } from "../../../features/coins/coinSlice";
import { Link } from "react-router-dom";

export default function CoinTable({ data }: { data: CoinType[] | undefined }) {
  const [favoriteCoins, setFavoriteCoins] = useState<CoinType[]>([]);
  const dispatch = useAppDispatch();
  const stateFavoriteCoins = useAppSelector(
    (state) => state.coins.favoriteCoins
  );

  const addFavoriteCoin = (record: CoinType) => {
    const coins = favoriteCoins.includes(record)
      ? favoriteCoins.filter((coin) => coin.uuid !== record.uuid)
      : [...favoriteCoins, record];
    setFavoriteCoins(coins);
    dispatch(addFavorite(record));
  };

  return (
    <Table dataSource={data} scroll={{ x: 1500 }}>
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        fixed="left"
        render={(_: undefined, record: CoinType) => (
          <Space align="center" size="middle">
            <Button
              danger
              style={{ border: 0 }}
              onClick={() => addFavoriteCoin(record)}
              icon={
                stateFavoriteCoins.includes(record) ? (
                  <HeartFilled />
                ) : (
                  <HeartOutlined />
                )
              }
            />
            <Image src={record.iconUrl} width={25} height={25} />
            <Flex vertical>
              <Link to={record.uuid}>
                <h4 style={{ fontWeight: "bold" }}>{record.name}</h4>
              </Link>
              <span>{record.symbol}</span>
            </Flex>
          </Space>
        )}
      />
      <Column
        title="Price"
        dataIndex="price"
        key="price"
        width="150"
        sorter={{
          compare: (a, b) => Number(a.price) - Number(b.price),
        }}
        showSorterTooltip={false}
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
        width="150"
        sorter={{
          compare: (a, b) => Number(a.marketCap) - Number(b.marketCap),
        }}
        showSorterTooltip={false}
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
        width="150"
        render={(_: undefined, record: CoinType) => {
          const color = Number(record.change) > 0 ? "green" : "red";
          return (
            <Tag color={color} key={record.change}>
              {record.change} %
            </Tag>
          );
        }}
      />
    </Table>
  );
}
