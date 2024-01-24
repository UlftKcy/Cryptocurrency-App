import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, List, Modal } from "antd";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchSearchSuggestionCoins } from "../../utils/service/api";
import { SearchSuggestionCoinType } from "../../types";

export default function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchSuggestionCoins, setSearchSuggestionCoins] = useState<
    SearchSuggestionCoinType[] | undefined
  >([]);
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce<string>(query, 500);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
    setQuery("");
  };

  const handleClear = () => {
    setSearchSuggestionCoins([]);
    setQuery("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleRoute = (uuid:string)=>{
    navigate(uuid);
    setIsModalOpen(false);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getSearchSuggestionCoins = async () => {
      const res = await fetchSearchSuggestionCoins(debouncedValue, signal);
      setSearchSuggestionCoins(res);
    };

    if (debouncedValue) {
      getSearchSuggestionCoins();
    }

    return () => {
      controller.abort();
    };
  }, [debouncedValue]);

  return (
    <Fragment>
      <SearchOutlined onClick={showModal} />
      <Modal
        title="Search Coin"
        open={isModalOpen}
        closeIcon={false}
        footer={[
          <>
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={handleCancel}>Close</Button>
          </>
        ]}
      >
        <Input
          onChange={handleChange}
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Search..."
          style={{ margin: "16px 0" }}
          value={query}
        />
        <List
          itemLayout="horizontal"
          dataSource={searchSuggestionCoins}
          header={searchSuggestionCoins && searchSuggestionCoins?.length > 0 ? <h4 style={{ opacity: 0.8 }}>Coins</h4> : ""}
          footer={false}
          size="small"
          renderItem={(item) => (
            <List.Item key={item.uuid}>
              <List.Item.Meta
                avatar={<Avatar src={item.iconUrl} />}
                title={<Button type="link" onClick={()=>handleRoute(item.uuid)}>{item.name}</Button>}
              />
            </List.Item>
          )}
        />
      </Modal>
    </Fragment>
  );
}
