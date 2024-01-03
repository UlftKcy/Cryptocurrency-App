import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetail";
import { Layout } from "antd";
import { CSSProperties } from "react";

const { Header, Content } = Layout;

const headerStyle: CSSProperties = {
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  fontSize: "1.2rem",
  letterSpacing: "1px",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  minHeight: "100vh",
};

function App() {
  return (
    <Layout style={layoutStyle}>
      <Content>
        <Router>
          <Header style={headerStyle}>
            <Link to="/" relative="path">
              CoinRanking
            </Link>
          </Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":uuid" element={<CoinDetail />} />
          </Routes>
        </Router>
      </Content>
    </Layout>
  );
}

export default App;
