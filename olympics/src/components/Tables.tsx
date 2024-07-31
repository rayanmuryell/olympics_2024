import React, { useEffect, useState } from "react";
import { Image, Input, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Tables.css";

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
  rank: number;
}

const Tables: React.FC = () => {
  const [medals, setMedals] = useState<Medal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMedals = medals.filter((medal) =>
    medal.country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      sorter: (a: any, b: any) => a.rank - b.rank,
      render: (rank: number) => rank,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: (a: any, b: any) => a.country.name.localeCompare(b.country.name),
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
      title: (
        <>
          <Image
            width={20}
            src="https://www.svgrepo.com/show/7725/gold-medal.svg"
            alt="Gold Medal"
            style={{ marginRight: "20px" }}
            preview={false}
          />
          Gold
        </>
      ),
      dataIndex: ["medals", "gold"],
      key: "gold",
      sorter: (a: any, b: any) => a.medals.gold - b.medals.gold,
      render: (_: any, record: Medal) => record.medals.gold,
    },
    {
      title: (
        <>
          <Image
            width={20}
            src="https://www.svgrepo.com/show/13712/silver-medal.svg"
            alt="Silver Medal"
            style={{ marginRight: "20px" }}
            preview={false}
          />
          Silver
        </>
      ),
      dataIndex: ["medals", "silver"],
      key: "silver",
      sorter: (a: any, b: any) => a.medals.silver - b.medals.silver,
      render: (_: any, record: Medal) => record.medals.silver,
    },
    {
      title: (
        <>
          <Image
            width={20}
            src="https://www.svgrepo.com/show/87539/bronze-medal.svg"
            alt="Bronze Medal"
            style={{ marginRight: "20px" }}
            preview={false}
          />
          Bronze
        </>
      ),
      dataIndex: ["medals", "bronze"],
      key: "bronze",
      sorter: (a: any, b: any) => a.medals.bronze - b.medals.bronze,
      render: (_: any, record: Medal) => record.medals.bronze,
    },
    {
      title: "Total",
      dataIndex: ["medals", "total"],
      key: "total",
      sorter: (a: any, b: any) => a.medals.total - b.medals.total,
      render: (_: any, record: Medal) => record.medals.total,
    },
  ];

  return (
    <>
      <Input
        placeholder="Search by country"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: "100%", maxWidth: 300 }}
      />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />}
          />
        </div>
      ) : (
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={filteredMedals}
            pagination={{ pageSize: 10 }}
            rowKey={(record) => record.country.code}
            bordered
            scroll={{ x: true }}
            title={() => "Total Medals by Country"}
            footer={() => "Paris 2024 Olympic Medal Tally Unofficial API"}
          />
        </div>
      )}
    </>
  );
};

export default Tables;
