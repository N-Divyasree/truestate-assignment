export default function Table() {
  return (
    <table
      border="1"
      cellPadding="8"
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Final Amount</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Sample Customer</td>
          <td>9999999999</td>
          <td>Sample Product</td>
          <td>2</td>
          <td>₹500</td>
        </tr>
      </tbody>
    </table>
  );
}
