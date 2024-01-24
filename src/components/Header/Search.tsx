import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Input, List, Modal } from "antd";
import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";

export default function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const searchSuggestionCoins = useAppSelector(
    (state) => state.coins.searchSuggestionCoins
  );

  const showModal = () => {
    setIsModalOpen(true);
    
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (text: string) => {
    setQuery(text);
  };


  return (
    <Fragment>
      <SearchOutlined onClick={showModal} />
      <Modal
        title="Search Coin"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          onChange={(e) => handleChange(e.target.value)}
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Search..."
          style={{ margin: "16px 0" }}
        />
        <List
          itemLayout="horizontal"
          dataSource={searchSuggestionCoins}
          header={<h4 style={{opacity:0.8}}>Coins</h4>}
          size="small"
          renderItem={(item) => (
            <List.Item key={item.uuid}>
              <List.Item.Meta
                avatar={<Avatar src={item.iconUrl} />}
                title={<Link to={item.uuid}>{item.name}</Link>}
              />
            </List.Item>
          )}
        />
      </Modal>
    </Fragment>
  );
}
