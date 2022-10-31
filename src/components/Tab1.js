import React from "react";
import { Button, Form, InputNumber, PageHeader } from "antd";
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
    //set all value = 0
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
      <PageHeader style={{ fontSize: "20px", paddingTop: "1px" }}>
        Mời bạn nhập các thông tin
      </PageHeader>
      <Form.Item
        name="height"
        label="Chiều cao (m)"
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          onChange={(val) => setHeight(val)}
          style={{ borderRadius: "0.25rem", width: "250px" }}
          max={10}
        />
      </Form.Item>
      <Form.Item
        name="weight"
        label="Cân nặng (kg)"
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          onChange={(val) => setWeight(val)}
          style={{ borderRadius: "0.25rem", width: "250px" }}
        />
      </Form.Item>
      <Form.Item
        name="heartbeat"
        label="Nhịp tim (lần/phút)"
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          onChange={(val) => setHeartBeat(val)}
          style={{ borderRadius: "0.25rem", width: "250px" }}
        />
      </Form.Item>
      <Form.Item
        name="bloodPressure"
        label="Huyết áp (mmHg)"
        rules={[{ required: true }]}
      >
        <InputNumber
          min={0}
          onChange={(val) => setBloodPressure(val)}
          style={{ borderRadius: "0.25rem", width: "250px" }}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ borderRadius: "0.25rem" }}
        >
          Tính chỉ số sức khỏe
        </Button>
        <Button
          htmlType="button"
          onClick={onReset}
          style={{ background: "red", color: "white", borderRadius: "0.25rem" }}
        >
          Xóa toàn bộ thông tin
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Tab1;
