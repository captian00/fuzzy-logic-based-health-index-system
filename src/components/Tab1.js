import React, { useEffect, useState } from "react";
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
  const {
    setWeight,
    setHeight,
    setHeartBeat,
    setBloodPressure,
    setSubmit,
    kq,
  } = useMainContext();
  const [detail, setDetail] = useState([]);

  const left = (x, a, b) => {
    return (x - a) / (b - a);
  };

  const right = (x, c, d) => {
    return (d - x) / (d - c);
  };

  const showDetail = (kq) => {
    let arr = [];
    // if (kq <= 1) {
    //   arr = [...arr, { label: "Y", result: 0 }];
    // }
    if (kq < 25 && kq > 1) {
      arr = [...arr, { label: "Yếu", result: left(kq, 1, 25) }];
    }
    if (kq === 25 ) {
      arr = [...arr, { label: "Yếu", result: 1 }];
    }
    if (kq < 35 && kq > 25) {
      arr = [...arr, { label: "Yếu", result: right(kq, 25, 45) }];
    }
    if (kq >= 35 && kq <= 45) {
      arr = [
        ...arr,
        { label: "Yếu", result: right(kq, 25, 45) },
        { label: "Không khỏe lắm", result: left(kq, 35, 50) },
      ];
    }
    if (kq < 50 && kq > 45) {
      arr = [...arr, { label: "Không khỏe lắm", result: left(kq, 35, 50) }];
    }
    if (kq === 50) {
      arr = [...arr, { label: "Không khỏe lắm", result: 1 }];
    }
    if (kq < 55 && kq > 50) {
      arr = [...arr, { label: "Không khỏe lắm", result: right(kq, 50, 70) }];
    }
    if (kq >= 55 && kq <= 70) {
      arr = [
        ...arr,
        { label: "Không khỏe lắm", result: right(kq, 50, 70) },
        { label: "Có vẻ khỏe", result: left(kq, 55, 75) },
      ];
    }
    if (kq < 75 && kq > 70) {
      arr = [...arr, { label: "Có vẻ khỏe", result: left(kq, 55, 75) }];
    }
     if (kq === 75) {
       arr = [...arr, { label: "Có vẻ khỏe", result: 1 }];
     }
    if (kq < 80 && kq > 75) {
      arr = [...arr, { label: "Có vẻ khỏe", result: right(kq, 75, 85) }];
    }
    if (kq >= 80 && kq <= 85) {
      arr = [
        ...arr,
        { label: "Có vẻ khỏe", result: right(kq, 75, 85) },
        { label: "Khỏe", result: left(kq, 80, 90) },
      ];
    }
    if (kq < 90 && kq > 85) {
      arr = [...arr, { label: "Khỏe", result: left(kq, 80, 90) }];
    }
    if (kq === 90) {
      arr = [...arr, { label: "Khỏe", result: 1 }];
    }
    if (kq < 100 && kq > 90) {
      arr = [...arr, { label: "Khỏe", result: right(kq, 90, 100) }];
    }
    // setDetail(arr);
    return arr;
  };
  const onFinish = (values) => {
    setSubmit(true);
  };

  const onReset = () => {
    //set all value = 0
    form.resetFields();
    setSubmit(false);
    setWeight(0);
    setHeight(0);
    setHeartBeat(0);
    setBloodPressure(0);
  };

  // const onFill = () => {
  //   form.setFieldsValue({
  //     note: "Hello world!",
  //     gender: "male",
  //   });
  // };
  useEffect(() => {
    setDetail(showDetail(kq));
  }, [kq]);
  // console.log("detail: ", detail);
  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <PageHeader style={{ fontSize: "20px", paddingTop: "1px" }}>
          Mời bạn nhập các thông tin
        </PageHeader>
        <Form.Item
          name="height"
          label="Chiều cao (cm)"
          rules={[{ required: true }]}
        >
          <InputNumber
            min={0}
            onChange={(val) => {
              setHeight(val);
              setSubmit(false);
            }}
            style={{ borderRadius: "0.25rem", width: "250px" }}
          />
        </Form.Item>
        <Form.Item
          name="weight"
          label="Cân nặng (kg)"
          rules={[{ required: true }]}
        >
          <InputNumber
            min={0}
            onChange={(val) => {
              setWeight(val);
              setSubmit(false);
            }}
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
            onChange={(val) => {
              setHeartBeat(val);
              setSubmit(false);
            }}
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
            onChange={(val) => {
              setBloodPressure(val);
              setSubmit(false);
            }}
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
            style={{
              background: "red",
              color: "white",
              borderRadius: "0.25rem",
            }}
          >
            Xóa toàn bộ thông tin
          </Button>
        </Form.Item>
      </Form>
      <p>Chỉ số sức khỏe của bạn là: {kq !== 10000 && kq}</p>
      {detail.map((item) => (
        <p>{`Thuộc loại ${item.label}: ${item.result * 100}%`}</p>
      ))}
    </>
  );
};

export default Tab1;
