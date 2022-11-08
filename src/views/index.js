import React, { useState } from "react";
import { Tabs } from "antd";
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";
import Tab3 from "../components/Tab3";
import Tab4 from "../components/Tab4";
import Tab5 from "../components/Tab5";
import { Context } from "../common/context";


const Main = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [heartBeat, setHeartBeat] = useState(0);
  const [bloodPressure, setBloodPressure] = useState(0);
  return (
    <div className="mx-auto max-w-lg border-dashed border-2 border-indigo-600 h-full bg-slate-200">
      <div className="items-center justyfind-center">
        <Context.Provider
          value={{
            weight,
            height,
            heartBeat,
            bloodPressure,
            setWeight,
            setHeight,
            setHeartBeat,
            setBloodPressure,
          }}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Nhập thông tin" key="1">
              <Tab1 />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hiển thị kết quả" key="2">
              <Tab2 />
              <Tab3></Tab3>
              <Tab4></Tab4>
              <Tab5></Tab5>
            </Tabs.TabPane>
          </Tabs>
        </Context.Provider>
      </div>
    </div>
  );
};

export default Main;
