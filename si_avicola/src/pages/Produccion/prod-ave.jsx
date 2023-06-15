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
  reqSpeciesList,
  reqUpdateShedBatch,
} from "../../api";
import { DATEFORMAT, PAGES_SIZE } from "../../utils/constant";
import storageUtils from "../../utils/storageUtils";
import dayjs from "dayjs";
const { Search } = Input;
const { Option } = Select;
const NOMBRE_USUARIO = storageUtils.getUser().nombre_usuario;

export default function ProdAve() {
  const [loading, setLoading] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [id, setId] = useState();
  const [galpones, setGalpones] = useState([]);
  const [aves, setAves] = useState([]);

  const [form] = Form.useForm();

  const getData = async (response) => {
    if (response) {
    } else {
      setLoading(true);
      response = await reqBatchList();
      const g = (await reqShedList()).data;
      setGalpones(g.data);
      const esp = (await reqSpeciesList()).data;
      setAves(esp.data);
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
    // console.log(value, id_lote);
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
      dataIndex: "fecha_ingreso",
    },
    {
      title: "Origen",
      dataIndex: "origen",
      render: (o) => {
        switch (o) {
          case "c":
            return "Comprado";
          case "n":
            return "Nacido en granja";
          case "d":
            return "Desconocido";
          default:
            return "-";
        }
      },
    },
    {
      title: "Especie",
      dataIndex: "ave",
      render: (ave) => ave.especie,
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
    },
    {
      title: "Mortalidad",
      render: (lote) => {
        const mor = (lote.mortalidad / lote.cantidad) * 100;
        return `${mor}% (${lote.mortalidad})`;
      },
    },
    // {
    //   title:"Edad",

    // }
    // {
    //   title: "Fecha salida",
    //   dataIndex: "fecha_salida",
    //   render: (fs) => (fs === null ? "-" : fs),
    // },
    // {
    //   title: "Destino",
    //   dataIndex: "destino",
    //   render: (destino) => {
    //     switch (destino) {
    //       case "s":
    //         return "Sacrificio y procesamiento";
    //       case "v":
    //         return "Venta como aves vivas";
    //       case "pr":
    //         return "En producción";
    //       default:
    //         return "-";
    //     }
    //   },
    // },
    // {
    //   title: "Archivado",
    //   dataIndex: "archivado",
    //   render: (arc) => (arc === true ? "Si" : "No"),
    // },
    // {
    //   title: "Descripcion",
    //   dataIndex: "descripcion",
    //   render: (des) => (des === null ? " - " : des),
    // },
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
        fecha_ingreso: dayjs(lote.fecha_ingreso, DATEFORMAT),
        origen: lote.origen,
        cantidad: lote.cantidad,
        descripcion: lote.descripcion,
        id_ave: lote.id_ave,
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
    value.nombre_usuario = NOMBRE_USUARIO;
    if (isUpdate) {
      value.id_lote = id;
      result = (await reqEditBatch(value)).data;
    } else {
      result = (await reqAddBatch(value)).data;
    }
    if (result.status === 0) {
      value.fecha_ingreso = moment(value.fecha).format("YYYY-MM-DD");
      if (result.data) {
        dataSource.push(result.data);
        setDataSource([...dataSource]);
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
        const result = (await reqDeleteBatch(id_lote, NOMBRE_USUARIO)).data;
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
        pagination={{ defaultPageSize: PAGES_SIZE }}
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
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fecha Ingreso"
            name="fecha_ingreso"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Origen"
            name="origen"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Seleccione" allowClear>
              <Option value="c">Comprado</Option>
              <Option value="n">Nacido en granja</Option>
              <Option value="d">Desconocido</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Cantidad"
            name="cantidad"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item label="Descripcion" name="descripcion">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Especie"
            name="id_ave"
            rules={[
              {
                required: true,
                message: "Este campo no puede ser vacío!",
              },
            ]}
          >
            <Select placeholder="Seleccione" allowClear>
              {aves.map((ave) => (
                <Option value={ave.id} key={ave.id}>
                  {ave.especie}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
