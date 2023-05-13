import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Table,
  Modal,
  message,
  Row,
  Col,
  Form,
  DatePicker,
  Select,
  InputNumber,
} from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  reqAddBatch,
  reqBatchList,
  reqDeleteBatch,
  reqEditBatch,
  reqSearchBatch,
  reqShedList,
  reqUpdateShedBatch,
} from "../../api";
const { Search } = Input;
const { Option } = Select;

export default function ProdAve() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [id, setId] = useState();
  const [galpones, setGalpones] = useState([]);

  const getData = async (response) => {
    let g;
    if (response) {
    } else {
      setLoading(true);
      response = await reqBatchList();
      g = (await reqShedList()).data;
      setGalpones(g.data);
    }

    const result = response.data;

    // console.log(result);
    setLoading(false);
    if (result.status === 0) {
      setDataSource(result.data);
    } else {
      message.error(result.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSelect = async (value, id_lote) => {
    console.log(value, id_lote);
    const result = (await reqUpdateShedBatch(id_lote, value)).data;
    if (result.status === 0) {
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
  };

  const columns = [
    {
      title: "Nombre Lote",
      dataIndex: "nombre",
    },
    {
      title: "Fecha Ingreso",
      dataIndex: "fecha",
    },
    {
      title: "Propósito",
      dataIndex: "proposito",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      render: (estado) => {
        switch (estado) {
          case "rl":
            return "Recién llegado";
          case "cr":
            return "En crecimiento";
          case "pr":
            return "En producción";
          case "cu":
            return "En cuarentena";
          case "ve":
            return "Vendido";
          default:
            return "-";
        }
      },
    },
    {
      title: "Procedencia",
      dataIndex: "procedencia",
      render: (procedencia) => {
        switch (procedencia) {
          case "c ":
            return "Comprada";
          case "g ":
            return "Granja propia";
          case "d ":
            return "Desconocida";
          default:
            return "-";
        }
      },
    },
    {
      title: "Galpon",
      render: (lote) => (
        <Select
          defaultValue={lote.id_galpon}
          onSelect={(value) => onSelect(value, lote.id_lote)}
        >
          {galpones.map((gal) => (
            <Option value={gal.id_galpon} key={gal.id_galpon}>
              {gal.id_galpon}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Acción",
      render: (lote) => {
        return (
          <span>
            <Button
              type="primary"
              style={{ marginRight: 10 }}
              onClick={() => {
                setIsUpdate((_) => true);
                setId(lote.id_lote);
                showModal(lote, true);
              }}
            >
              Modificar
            </Button>
            <Button type="primary" onClick={() => deleteProduct(lote.id_lote)}>
              Eliminar
            </Button>
          </span>
        );
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (lote, isUpdate) => {
    if (isUpdate) {
      form.setFieldsValue({
        nombre: lote.nombre,
        fecha: moment(lote.fecha, "YYYY/MM/DD"),
        proposito: lote.proposito,
        cantidad: lote.cantidad,
        estado: lote.estado,
        procedencia: lote.procedencia,
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
    //
    // console.log(value);
    let result;
    if (isUpdate) {
      value.id_lote = id;
      result = (await reqEditBatch(value)).data;
    } else {
      result = (await reqAddBatch(value)).data;
    }
    if (result.status === 0) {
      value.fecha = moment(value.fecha).format("YYYY-MM-DD");
      if (result.data) {
        setDataSource([...dataSource, result.data]);
      } else {
        let index = dataSource.findIndex((lote) => lote.id_lote === id);
        dataSource[index] = { ...dataSource[index], ...value };
        setDataSource([...dataSource]);
      }
      message.success(result.msg);
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const deleteProduct = (id_lote) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "¿Estás seguro de eliminar este lote?",
      onOk: async () => {
        const result = (await reqDeleteBatch(id_lote)).data;
        if (result.status === 0) {
          let index = dataSource.findIndex((lote) => lote.id_lote === id_lote);
          dataSource.splice(index, 1);
          setDataSource([...dataSource]);
        } else {
          message.error(result.msg);
        }
        // console.log(dataSource);
      },
    });
  };

  const onSearch = async (value) => {
    const response = await reqSearchBatch(value);
    getData(response);
    // console.log(response);
  };

  const title = (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
      }}
    >
      <Col className="gutter-row" span={16}>
        <Search
          placeholder="Introduzca el nombre del Lote"
          onSearch={onSearch}
          enterButton
        />
      </Col>
    </Row>
  );

  const extra = (
    <Button
      type="primary"
      onClick={() => {
        setIsUpdate(false);
        setIsModalOpen(true);
      }}
    >
      <PlusOutlined />
      Añadir Nuevo Lote
    </Button>
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered={true}
        rowKey="id_lote"
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={{ defaultPageSize: 6 }}
      />
      ;
      <Modal
        title={isUpdate ? "Modificar Lote" : "Añadir Lote"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Nombre Lote"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Este campo no puede ser vacío!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fecha Ingreso"
            name="fecha"
            rules={[
              {
                required: true,
                message: "Este campo no puede ser vacío!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="proposito"
            label="Propósito"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Seleccione" onChange={() => {}} allowClear>
              <Option value="huevo">huevo</Option>
              <Option value="carne">carne</Option>
              <Option value="ambos">ambos</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Cantidad"
            name="cantidad"
            rules={[
              {
                required: true,
                message: "Este campo no puede ser vacío!",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Estado"
            name="estado"
            rules={[
              {
                required: true,
                message: "Este campo no puede ser vacío!",
              },
            ]}
          >
            <Select
              placeholder="Seleccione"
              onChange={(value) => {
                // console.log(value);
              }}
              allowClear
            >
              <Option value="rl">Recién llegado</Option>
              <Option value="cr">En crecimiento</Option>
              <Option value="pr">En producción</Option>
              <Option value="cu">En cuarentena</Option>
              <Option value="ve">Vendido</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Procedencia"
            name="procedencia"
            rules={[
              {
                required: true,
                message: "Este campo no puede ser vacío!",
              },
            ]}
          >
            <Select placeholder="Seleccione" allowClear>
              <Option value="c">comprada</Option>
              <Option value="g">granja propia</Option>
              <Option value="d">desconocida</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
