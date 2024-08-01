import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Select, Button } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

interface MedalData2024 {
  country: {
    code: string;
    name: string;
  };
  medals: {
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  };
}

interface MedalData2020 {
  country: string;
  country_alpha3: string;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  };
}

interface MedalComparisonProps {
  data2024: MedalData2024[];
}

const MedalComparison: React.FC<MedalComparisonProps> = ({ data2024 }) => {
  const [data2020, setData2020] = useState<MedalData2020 | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    data2024[0].country.code
  );

  useEffect(() => {
    const fetchData2020 = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kevle1/olympic-api/main/final.json"
        );
        const data: MedalData2020[] = await response.json();
        const countryData = data.find(
          (item) => item.country_alpha3 === selectedCountry
        );
        setData2020(countryData || null);
      } catch (error) {
        console.error("Error fetching data from 2020 API:", error);
      }
    };

    fetchData2020();
  }, [selectedCountry]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const getComparisonResult = (current: number, previous: number) => {
    return {
      value: current,
      status: current > previous ? "up" : current < previous ? "down" : "equal",
    };
  };

  const resetFilters = () => {
    setSelectedCountry(data2024[0].country.code); // Reseta para o primeiro país da lista
    setData2020(null);
  };

  if (!data2020) {
    return (
      <div>
        <div>No data to compare.</div>
        <Button onClick={resetFilters} type="primary">
          Reset Filters
        </Button>
      </div>
    );
  }

  const currentMedals = data2024.find(
    (c) => c.country.code === selectedCountry
  )?.medals;

  const goldComparison = getComparisonResult(
    currentMedals?.gold || 0,
    data2020.medals.gold
  );
  const silverComparison = getComparisonResult(
    currentMedals?.silver || 0,
    data2020.medals.silver
  );
  const bronzeComparison = getComparisonResult(
    currentMedals?.bronze || 0,
    data2020.medals.bronze
  );

  const totalComparison = getComparisonResult(
    currentMedals?.total || 0,
    data2020.medals.total
  );

  return (
    <div>
      <Select
        showSearch
        defaultValue={selectedCountry}
        onChange={handleCountryChange}
        style={{ marginBottom: 20, width: "100%", maxWidth: 200 }}
        filterOption={(input, option) => {
          if (!option || !option.children) return false;
          const children = Array.isArray(option.children)
            ? option.children.join("")
            : option.children;

          return (
            typeof children === "string" &&
            children.toLowerCase().includes(input.toLowerCase())
          );
        }}
      >
        {data2024.map((country) => (
          <Select.Option
            key={country.country.code}
            value={country.country.code}
          >
            {country.country.name}
          </Select.Option>
        ))}
      </Select>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card bordered={false} style={{ padding: 20 }}>
            <h3>
              <img
                alt="example"
                height={20}
                src={`https://gstatic.olympics.com/s1/t_original/static/noc/oly/3x2/180x120/${data2020.country_alpha3}.png`}
                style={{ marginRight: "10px" }}
              />
              {data2020.country} (2024)
            </h3>
            <Statistic
              title="Total Medals"
              value={currentMedals?.total}
              valueStyle={{
                color:
                  totalComparison.status === "up"
                    ? "#3f8600"
                    : totalComparison.status === "down"
                    ? "#cf1322"
                    : "#000000",
              }}
              prefix={
                totalComparison.status === "up" ? (
                  <ArrowUpOutlined />
                ) : totalComparison.status === "down" ? (
                  <ArrowDownOutlined />
                ) : null
              }
            />
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Card
                  bordered={false}
                  style={{ textAlign: "center", minHeight: 120 }}
                >
                  <h4>
                    Gold
                    <img
                      alt="example"
                      height={20}
                      src="https://www.svgrepo.com/show/7725/gold-medal.svg"
                    />
                  </h4>
                  <Statistic
                    value={goldComparison.value}
                    valueStyle={{
                      color:
                        goldComparison.status === "up"
                          ? "#3f8600"
                          : goldComparison.status === "down"
                          ? "#cf1322"
                          : "#000000",
                    }}
                    prefix={
                      goldComparison.status === "up" ? (
                        <ArrowUpOutlined />
                      ) : goldComparison.status === "down" ? (
                        <ArrowDownOutlined />
                      ) : null
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card
                  bordered={false}
                  style={{ textAlign: "center", minHeight: 120 }}
                >
                  <h4>
                    Silver
                    <img
                      alt="example"
                      height={20}
                      src="https://www.svgrepo.com/show/13712/silver-medal.svg"
                    />
                  </h4>
                  <Statistic
                    value={silverComparison.value}
                    valueStyle={{
                      color:
                        silverComparison.status === "up"
                          ? "#3f8600"
                          : silverComparison.status === "down"
                          ? "#cf1322"
                          : "#000000",
                    }}
                    prefix={
                      silverComparison.status === "up" ? (
                        <ArrowUpOutlined />
                      ) : silverComparison.status === "down" ? (
                        <ArrowDownOutlined />
                      ) : null
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card
                  bordered={false}
                  style={{ textAlign: "center", minHeight: 120 }}
                >
                  <h4>
                    Bronze
                    <img
                      alt="example"
                      height={20}
                      src="https://www.svgrepo.com/show/87539/bronze-medal.svg"
                    />
                  </h4>
                  <Statistic
                    value={bronzeComparison.value}
                    valueStyle={{
                      color:
                        bronzeComparison.status === "up"
                          ? "#3f8600"
                          : bronzeComparison.status === "down"
                          ? "#cf1322"
                          : "#000000",
                    }}
                    prefix={
                      bronzeComparison.status === "up" ? (
                        <ArrowUpOutlined />
                      ) : bronzeComparison.status === "down" ? (
                        <ArrowDownOutlined />
                      ) : null
                    }
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card bordered={false} style={{ padding: 20 }}>
            <h3>{data2020.country} (2020)</h3>
            <Statistic title="Total Medals" value={data2020.medals.total} />
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Card
                  bordered={false}
                  style={{ textAlign: "center", minHeight: 120 }}
                >
                  <h4>
                    Gold
                    <img
                      alt="example"
                      height={20}
                      src="https://www.svgrepo.com/show/7725/gold-medal.svg"
                    />
                  </h4>
                  <Statistic value={data2020.medals.gold} />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card
                  bordered={false}
                  style={{ textAlign: "center", minHeight: 120 }}
                >
                  <h4>
                    Silver
                    <img
                      alt="example"
                      height={20}
                      src="https://www.svgrepo.com/show/13712/silver-medal.svg"
                    />
                  </h4>
                  <Statistic value={data2020.medals.silver} />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card
                  bordered={false}
                  style={{ textAlign: "center", minHeight: 120 }}
                >
                  <h4>
                    Bronze
                    <img
                      alt="example"
                      height={20}
                      src="https://www.svgrepo.com/show/87539/bronze-medal.svg"
                    />
                  </h4>
                  <Statistic value={data2020.medals.bronze} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MedalComparison;
