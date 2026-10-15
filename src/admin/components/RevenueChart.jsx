import { useMemo, useState } from "react";
import Chart from "react-apexcharts";

const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const RevenueChart = ({ revenueData = [] }) => {
  const [period, setPeriod] = useState("daily");

  const data = useMemo(() => {
    const grouped = {};

    revenueData.forEach(({ date, revenue }) => {
      const key = period === "daily" ? date : date.slice(0, 7);
      grouped[key] = (grouped[key] || 0) + Number(revenue);
    });

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, revenue]) => ({
        label:
          period === "daily"
            ? formatDate(key)
            : new Date(`${key}-01T00:00:00`).toLocaleDateString(
                "en-IN",
                { month: "short", year: "numeric" }
              ),
        revenue,
      }));
  }, [revenueData, period]);

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "inherit",
      animations: { enabled: true },
    },
    colors: ["#2563eb"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 0.4,
        opacityTo: 0.02,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#e9edf5",
      strokeDashArray: 4,
      padding: { left: 8, right: 12 },
    },
    xaxis: {
      categories: data.map((item) => item.label),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#9299a8", fontSize: "11px" },
        rotate: -30,
        hideOverlappingLabels: true,
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9299a8" },
        formatter: (value) =>
          `₹${Math.round(value).toLocaleString("en-IN")}`,
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) =>
          `₹${Number(value).toLocaleString("en-IN")}`,
      },
    },
    noData: {
      text: "No revenue data available",
      align: "center",
      verticalAlign: "middle",
      style: { color: "#9299a8", fontSize: "14px" },
    },
  };

  const series = [
    {
      name: "Revenue",
      data: data.map((item) => item.revenue),
    },
  ];

  return (
    <section
      style={{
        background: "#fff",
        border: "1px solid #e8ebf0",
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <p style={{ color: "#858b99", margin: 0, fontSize: "13px" }}>
            REVENUE OVERVIEW
          </p>
          <h2
            style={{
              margin: "6px 0",
              fontSize: "22px",
              fontWeight: 650,
              color: "#171c2c",
            }}
          >
            Revenue analytics
          </h2>
          <p style={{ color: "#9299a8", margin: 0, fontSize: "13px" }}>
            Delivered orders · INR
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "4px",
            background: "#f2f4f8",
            padding: "4px",
            borderRadius: "10px",
          }}
        >
          {["daily", "monthly"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              style={{
                border: "none",
                borderRadius: "7px",
                padding: "9px 16px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
                textTransform: "capitalize",
                background: period === item ? "#fff" : "transparent",
                color: period === item ? "#2563eb" : "#777f90",
                boxShadow:
                  period === item
                    ? "0 1px 4px rgba(0,0,0,0.08)"
                    : "none",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <Chart
          options={options}
          series={series}
          type="area"
          height={320}
        />
      </div>
    </section>
  );
};

export default RevenueChart;