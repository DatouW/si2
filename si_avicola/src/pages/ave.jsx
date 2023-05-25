import { Button, Card, Table, message, Form, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { reqAddSpecies, reqSpeciesList, reqUpdateSpecies } from "../api";
import { PAGES_SIZE } from "../utils/constant";

export default function Ave() {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState([]);

  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    setLoading(true);

    const result = (await reqSpeciesList()).data;

    setLoading(false);
    if (result.status === 0) {
      setData(result.data);
    } else {
      message.error(result.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Especie",
      dataIndex: "especie",
    },
    {
      title: "Acción",
      render: (ave) => (
        <Button
          type="primary"
          onClick={() => {
            setId(ave.id);
            setIsUpdate(true);
            showModal(ave, true);
          }}
        >
          Modificar
        </Button>
      ),
    },
  ];

  const showModal = (ave, isUpdate) => {
    if (isUpdate) {
      form.setFieldsValue({
        especie: ave.especie,
      });
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (value) => {
    let result;
    if (isUpdate) {
      result = (await reqUpdateSpecies(id, value.especie)).data;
      // console.log(value);
    } else {
      result = (await reqAddSpecies(value.especie)).data;
    }
    if (result.status === 0) {
      if (result.data) {
        setData([...data, result.data]);
      } else {
        let index = data.findIndex((ave) => ave.id === id);
        data[index] = { ...data[index], ...value };
        // console.log(data);
        setData([...data]);
      }
      // message.success(result.msg);
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const extra = (
    <Button
      type="primary"
      onClick={() => {
        setIsUpdate(false);
        showModal();
      }}
    >
      <PlusOutlined /> Añadir Especie
    </Button>
  );
  return (
    <Card extra={extra}>
      <Table
        bordered={true}
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ defaultPageSize: PAGES_SIZE }}
      />
      <Modal
        title={isUpdate ? "Modificar Especie" : "Añadir Especie"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Especie"
            name="especie"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
