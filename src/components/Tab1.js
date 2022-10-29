import React from "react";
import { Button, Form, InputNumber } from "antd";
import { useMainContext } from "../common/context";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Tab1 = () => {
  const [form] = Form.useForm();
  const { setWeight, setHeight, setHeartBeat, setBloodPressure } =
    useMainContext();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  // const onFill = () => {
  //   form.setFieldsValue({
  //     note: "Hello world!",
  //     gender: "male",
  //   });
  // };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="height" label="Height" rules={[{ required: true }]}>
        <InputNumber min={0} onChange={(val) => setHeight(val)} />
      </Form.Item>
      <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
        <InputNumber min={0} onChange={(val) => setWeight(val)} />
      </Form.Item>
      <Form.Item
        name="heartbeat"
        label="Heart Beat"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} onChange={(val) => setHeartBeat(val)} />
      </Form.Item>
      <Form.Item
        name="bloodPressure"
        label="Blood Pressure"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} onChange={(val) => setBloodPressure(val)} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Tab1;
