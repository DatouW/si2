import { Card, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import { reqLogList } from "../../api";
import { DATEHOURFORMAT, PAGES_SIZE } from "../../utils/constant";
import moment from "moment";

export default function Bitacora() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(true);

    let result = (await reqLogList()).data;
    // console.log(result);
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
      title: "Fecha Hora",
      dataIndex: "fecha",
      render: (fecha) => moment(fecha).format(DATEHOURFORMAT),
    },
    {
      title: "Usuario",
      dataIndex: "username",
    },
    {
      title: "Operación",
      dataIndex: "operacion",
    },
  ];

  return (
    <Card>
      <Table
        bordered={true}
        rowKey="id_log"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ defaultPageSize: PAGES_SIZE }}
      />
    </Card>
  );
}
