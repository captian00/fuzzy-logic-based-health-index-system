import React, { useState } from "react";
import { Tabs } from "antd";
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";

import { Context } from "../common/context";

const Main = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [heartBeat, setHeartBeat] = useState(0);
  const [bloodPressure, setBloodPressure] = useState(0);
  const [submit, setSubmit] = useState(false);
  return (
    <div className="mx-auto max-w-lg border-dashed border-2 border-indigo-600 h-full bg-slate-200">
      <div className="items-center justyfind-center">
        <Context.Provider
          value={{
            weight,
            height,
            heartBeat,
            bloodPressure,
            submit,
            setWeight,
            setHeight,
            setHeartBeat,
            setBloodPressure,
            setSubmit,
          }}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Nhập thông tin" key="1">
              <Tab1 />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hiển thị kết quả" key="2">
              <Tab2 />
            </Tabs.TabPane>
          </Tabs>
        </Context.Provider>
      </div>
    </div>
  );
};

export default Main;
