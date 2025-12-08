export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <input
        type="text"
        placeholder="Search by Customer Name or Phone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "500%",
          padding: "20px",
          fontSize: "14px"
        }}
      />
    </div>
  );
}
