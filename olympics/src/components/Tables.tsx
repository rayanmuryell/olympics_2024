import React, { useEffect, useState } from "react";
import { Image, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Medal {
  country: {
    name: string;
    code: string;
  };
  medals: {
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  };
  rank: {
    rank: number;
  };
}

const Tables: React.FC = () => {
  const [medals, setMedals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedals = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.olympics.kevle.xyz/medals");

        const data = await response.json();
        setMedals(data.results);
      } catch (error) {
        console.error("Erro ao buscar os dados das medalhas!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedals();
  }, []);

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (rank: number) => rank,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (_: any, record: Medal) => (
        <>
          <Image
            width={25}
            src={`https://gstatic.olympics.com/s1/t_original/static/noc/oly/3x2/180x120/${record.country.code}.png`}
            alt={`${record.country.name} flag`}
          />
          <span style={{ marginLeft: "10px" }}>{record.country.name}</span>
        </>
      ),
    },
    {
      title: "Gold",
      dataIndex: "medals",
      key: "gold",
      render: (_: any, record: Medal) => record.medals.gold,
    },
    {
      title: "Silver",
      dataIndex: "medals",
      key: "silver",
      render: (_: any, record: Medal) => record.medals.silver,
    },
    {
      title: "Bronze",
      dataIndex: "medals",
      key: "bronze",
      render: (_: any, record: Medal) => record.medals.bronze,
    },
    {
      title: "Total",
      dataIndex: "medals",
      key: "total",
      render: (_: any, record: Medal) => record.medals.total,
    },
  ];

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={medals}
          pagination={{ pageSize: 10 }}
          rowKey={(record) => record.country.code}
          bordered
          title={() => "Total Medals by Country"}
          footer={() => "Dados consumidos da API do kevle1"}
        />
      )}
    </>
  );
};

export default Tables;
