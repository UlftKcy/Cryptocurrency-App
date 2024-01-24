import { Flex } from "antd";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Navbar() {
    return (
        <Flex justify="space-between" align="center">
            <Link to="/" relative="path">
                CoinRanking
            </Link>
            <Search />
        </Flex>
    );
}
