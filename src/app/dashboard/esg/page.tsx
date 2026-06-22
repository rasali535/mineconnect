import ESGClient from "./ESGClient";

export default function ESGPage() {
  const mockESGData = [
    { id: 1, metric: "CO2 Emissions", value: 1250, target: 1500, unit: "tons", recorded_at: "2026-06-15T10:00:00Z" },
    { id: 2, metric: "Water Usage", value: 4500, target: 5000, unit: "kL", recorded_at: "2026-06-15T10:00:00Z" },
    { id: 3, metric: "Energy Consumption", value: 820, target: 850, unit: "MWh", recorded_at: "2026-06-15T10:00:00Z" },
    { id: 4, metric: "Waste Recycled", value: 45, target: 60, unit: "%", recorded_at: "2026-06-10T10:00:00Z" },
    { id: 5, metric: "Community Investment", value: 2.5, target: 2.0, unit: "M BWP", recorded_at: "2026-06-01T10:00:00Z" }
  ];

  return <ESGClient esgData={mockESGData} />;
}
