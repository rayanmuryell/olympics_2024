import React, { useState } from "react";
import { Table, Image, Select, Button } from "antd";
import { Medal } from "../api/fetchMedals";
import { formatDate } from "../utils/formatDate";

const { Option } = Select;

interface MedalTableProps {
  medals: Medal[];
  lastUpdated: string;
}

const MedalTable: React.FC<MedalTableProps> = ({ medals, lastUpdated }) => {
  const [searchTerm] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleCountryChange = (value: string[]) => {
    setSelectedCountries(value);
  };

  const clearSelection = () => {
    setSelectedCountries([]);
  };

  const filteredMedals = medals.filter((medal) => {
    const matchesSearchTerm = medal.country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSelectedCountry =
      selectedCountries.length === 0 ||
      selectedCountries.includes(medal.country.name);
    return matchesSearchTerm && matchesSelectedCountry;
  });

  const countryOptions = Array.from(
    new Set(medals.map((medal) => medal.country.name))
  ).map((country) => (
    <Option key={country} value={country}>
      {country}
    </Option>
  ));

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

  const formattedLastUpdated = formatDate(lastUpdated);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Select
          mode="multiple"
          placeholder="Filter by countries"
          value={selectedCountries}
          onChange={handleCountryChange}
          style={{ marginRight: 16, width: "100%", maxWidth: 300 }}
        >
          {countryOptions}
        </Select>
        <Button onClick={clearSelection}>Clear</Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredMedals}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record.country.code}
        bordered
        scroll={{ x: true }}
        title={() => "Total Medals by Country"}
        footer={() => `Last updated: ${formattedLastUpdated}`}
      />
    </>
  );
};

export default MedalTable;
