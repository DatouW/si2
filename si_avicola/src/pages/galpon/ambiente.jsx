import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Table,
  Modal,
  message,
  Form,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  reqAddAmbiente,
  reqAddBatchAmbiente,
  reqAmbienteList,
} from "../../api";
import { PAGES_SIZE } from "../../utils/constant";

export default function Ambiente() {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState({});
  const [form] = Form.useForm();

  const getData = async () => {
    setLoading(true);

    const result = (await reqAmbienteList()).data;

    setLoading(false);
    if (result.status === 0) {
      setDataSource(result.data);
      // console.log(result.data);
    } else {
      message.error(result.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const expandedRowRender = (record) => {
    const data = record.lotes;
    console.log(record);

    const columns = [
      {
        title: "Lote",
        dataIndex: "nombre",
      },
      {
        title: "Cantidad",
        dataIndex: "cantidad",
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(data) => data.id_lote}
      />
    );
  };

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
    },
    {
      title: "Hora",
      dataIndex: "hora",
    },
    {
      title: "Humedad",
      dataIndex: "humedad",
    },
    {
      title: "Temperatura (°C)",
      dataIndex: "temperatura",
    },
    {
      title: "Acción",
      render: (ambiente) => {
        return "";
        // <Button
        //   type="primary"
        //   style={{ marginRight: 10 }}
        //   onClick={() => {
        //     setIsUpdate((_) => true);
        //     setId({ fecha: ambiente.fecha, hora: ambiente.hora });
        //     showModal(ambiente, true);
        //   }}
        // >
        //   Registrar Lote
        // </Button>
      },
    },
  ];

  const showModal = (galpon, isUpdate) => {
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
    // console.log(value);
    let result;
    if (isUpdate) {
      value.fecha = id.fecha;
      value.hora = id.hora;
      result = (await reqAddBatchAmbiente(value)).data;
    } else {
      result = (await reqAddAmbiente(value)).data;
    }
    console.log(result);
    if (result.status === 0) {
      if (isUpdate) {
        let index = dataSource.findIndex(
          (ambiente) => ambiente.fecha === id.fecha && ambiente.hora === id.hora
        );
        dataSource[index] = result.data;
        setDataSource([...dataSource]);
      } else {
        console.log([...dataSource, result.data]);
        setDataSource([...dataSource, result.data]);
      }
      message.success(result.msg);
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const extra = (
    <Button
      type="primary"
      onClick={() => {
        setIsUpdate(false);
        setIsModalOpen(true);
      }}
    >
      <PlusOutlined />
      Registrar Temperatura Humedad
    </Button>
  );

  return (
    <Card extra={extra}>
      <Table
        bordered={true}
        rowKey="hora"
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        pagination={{ defaultPageSize: PAGES_SIZE }}
      />
      ;
      <Modal
        title={
          isUpdate ? "Modificar Galpon" : "Registrar temperatura & humedad"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isUpdate ? (
          ""
        ) : (
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label="Fecha"
              name="fecha"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Hora"
              name="hora"
              rules={[
                {
                  required: true,
                },
                {
                  pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                  message: "Invalido",
                },
              ]}
            >
              <Input placeholder="Formato: HH:mm" />
            </Form.Item>

            <Form.Item
              label="Temperatura"
              name="temperatura"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Humedad"
              name="humedad"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Card>
  );
}
