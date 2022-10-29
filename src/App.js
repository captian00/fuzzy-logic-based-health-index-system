import "./App.css";
import "antd/dist/antd.css";
import { PageHeader } from "antd";
import Main from "./views";

function App() {
  return (
    <div className="App ">
      <PageHeader style={{fontSize:'40px'}}>Hệ Thống Đánh Giá Chỉ Số Sức Khỏe</PageHeader>
      <Main />
    </div>
  );
}

export default App;
