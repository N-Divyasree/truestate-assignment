import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";


export default function App() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [product, setProduct] = useState("");
  // ----- TAGS (multi-select) -----
  const [tags, setTags] = useState([]); // <- changed to array
  // -------------------------------
  const [showTags, setShowTags] = useState(false);
  const [date, setDate] = useState("");
  const [payment, setPayment] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10; // per assignment requirement

  // Fetch data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sales")
      .then((res) => {
        setSales(res.data);
        console.log("Sales sample:", res.data[0]);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".tags-dropdown")) {
        setShowTags(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);




  // Toggle tag
  const toggleTag = (tag) => {
    setTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const normalizeItemTags = (item) => {
    if (!item["Tags"]) return [];
    return String(item["Tags"])
      .split(",")
      .map(t => t.trim().toLowerCase());
  };


  


  // Apply Filters + Sorting
  const filteredData = sales
    .filter((item) => {
      // normalize search & fields to avoid crashes when value missing
      const name = (item["Customer Name"] || "").toString().toLowerCase();
      const phone = (item["Phone"] || item["Phone Number"] || "").toString();
      const itemRegion = item["Customer Region"] || "";
      const itemGender = item["Gender"] || "";
      //const itemAge = item["Age"] || item["Age Range"] || "";
      const itemAge = Number(item["Age"]);
      const itemProduct = item["Product Category"] || "";
      const itemPayment = item["Payment Method"] || "";
      //const itemDate = item["Date"] || ""; // your dataset's date field
      const itemDate = new Date(item["Date"]);

      // normalize tags on this item
      const itemTagsNorm = normalizeItemTags(item); // array of lowercase tags
      const selectedTagsNorm = tags.map((t) => t.toLowerCase());

      // SEARCH (name or phone)
      const searchMatch =
        name.includes(search.toLowerCase()) || (phone && phone.includes(search));

      // REGION / GENDER / AGE / PRODUCT / PAYMENT / DATE filters (dropdowns)
      const regionMatch = region ? itemRegion === region : true;
      const genderMatch = gender ? itemGender === gender : true;
      //const ageMatch = age ? String(itemAge) === String(age) : true;
      let ageMatch = true;
      if (age === "18-25") ageMatch = itemAge >= 18 && itemAge <= 25;
      else if (age === "26-35") ageMatch = itemAge >= 26 && itemAge <= 35;
      else if (age === "36-45") ageMatch = itemAge >= 36 && itemAge <= 45;
      else if (age === "46-55") ageMatch = itemAge >= 46 && itemAge <= 55;
      else if (age === "56+") ageMatch = itemAge >= 56;

      const productMatch = product ? itemProduct === product : true;
      const paymentMatch = payment ? itemPayment === payment : true;

      // DATE filter: you currently use values like "7", "30" etc.
      // This example keeps the same simple comparison you had; adjust if you want date-range logic.
      //const dateMatch = date ? itemDate === date : true;
      let dateMatch = true;
      if (date) {
        const today = new Date();
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - Number(date));
        dateMatch = itemDate >= pastDate && itemDate <= today;
      }


      // TAGS filter:
      // if user selected no tags -> pass
      // if user selected tags -> check if itemTags contain ANY of the selected tags (OR behavior)
      const tagsMatch =
        selectedTagsNorm.length > 0
          ? selectedTagsNorm.some((st) => itemTagsNorm.includes(st))
          : true;

      return (
        searchMatch &&
        regionMatch &&
        genderMatch &&
        ageMatch &&
        productMatch &&
        tagsMatch &&
        dateMatch &&
        paymentMatch
      );
    })
    .sort((a, b) => {
      if (sortBy === "customer") {
        return (a["Customer Name"] || "")
        .toString()
        .localeCompare((b["Customer Name"] || "").toString());
      }
      if (sortBy === "quantity") {
        return (b["Quantity"] || 0) - (a["Quantity"] || 0);
      }
      if (sortBy === "date") {
        const dateA = new Date(a["Date"]);
        const dateB = new Date(b["Date"]);
        return dateB - dateA; // newest first
        }
        return 0;
      })


  // Total pages based on filtered results
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  // Ensure page stays valid when filters/search/sort change
  useEffect(() => {
    setPage(1);
  }, [search, region, gender, age, product, tags, date, payment, sortBy]);

  // Also clamp page if filteredData length shrinks but page > totalPages
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1);
    }
  }, [filteredData.length, totalPages, page]);

  // Paginated slice
  const startIndex = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  // Handlers
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const goToPage = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  // TAGS list (the checkbox options). Keep only these in the UI — you said only tags use checkboxes.
  const allTagOptions = [
    "fashion",
    "casual",
    "cotton",
    "formal",
    "makeup",
    "organic",
    "beauty",
    "skincare",
    "fragrance-free",
    "unisex",
    "portable",
    "wireless",
    "gadgets",
    "accessories",
    "smart",
  ];

  return (
    <div style={{ padding: 20, fontFamily: "Inter, sans-serif" }}>
      <h1>Retail Sales Dashboard</h1>

      {/* Search */}
      <input
        placeholder="Search by Customer Name or Phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 15, width: "130%", marginBottom: 15 }}
      />

      {/* Filters & Sorting */}
      <div className="filters-row">

        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="Central">Central</option>
        </select>

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select value={age} onChange={(e) => setAge(e.target.value)}>
          <option value="">Age Range</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46-55">46-55</option>
          <option value="56+">56+</option>
        </select>

        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="">Product Category </option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          
          <option value="Beauty">Beauty</option>
          
          
        </select>

        {/* --- TAG DROPDOWN --- */}
<div className="tags-dropdown" style={{ position: "relative" }}>
  <button
    onClick={() => setShowTags(!showTags)}
    style={{
      padding: "8px 12px",
      borderRadius: 6,
      border: "1px solid   #ccc",
      cursor: "pointer",
      background: "#2c7df0"
    }}
  >
    Tags ▼
  </button>

  {showTags && (
    <div
      style={{
        position: "absolute",
        top: "110%",
        left: 0,
        background: "white",
        border: "1px solid #ccc",
        padding: 10,
        borderRadius: 8,
        maxHeight: 180,
        overflowY: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 10
      }}
    >
      {allTagOptions.map((t) => (
        <label
          key={t}
          style={{
            display: "block",
            padding: "4px 0",
            cursor: "pointer",
            fontSize: 14
          }}
        >
          <input
            type="checkbox"
            checked={tags.includes(t)}
            onChange={() => toggleTag(t)}
            style={{ marginRight: 6 }}
          />
          {t}
        </label>
      ))}
    </div>
  )}
</div>
{/* --- END TAG DROPDOWN --- */}




        








        <select value={date} onChange={(e) => setDate(e.target.value)}>
          <option value="">Date Range</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 3 Months</option>
          <option value="365">Last 1 Year</option>
        </select>

        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="">All Payment Methods</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Wallet">Wallet</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="date">Date (Newest First)</option>
          <option value="quantity">Quantity (High → Low)</option>
          <option value="customer">Customer Name (A–Z)</option>
        </select>


    
      </div>
        


      {/* Table */}
      <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Customer Region</th>
            <th>Customer Type</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Product Category</th>
            <th>Tags</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Discount Percentage</th>
            <th>Total Amount</th>
            <th>Final Amount</th>
            <th>Payment Method</th>
            <th>Order Status</th>
            <th>Delivery Type</th>
            <th>Store ID</th>
            <th>Store Location</th>
            <th>Salesperson ID</th>
            <th>Employee Name</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan="27" style={{ textAlign: "center", padding: 20 }}>
                No results  Found 😔
              </td>
            </tr>
          ) : (
            paginatedData.map((s, i) => (
              <tr key={startIndex + i}>
                <td>{s["Transaction ID"]}</td>
                <td>{s["Date"]}</td>
                <td>{s["Customer ID"]}</td>
                <td>{s["Customer Name"]}</td>
                <td>{s["Phone Number"] || s["Phone"]}</td>
                <td>{s["Gender"]}</td>
                <td>{s["Age"]}</td>
                <td>{s["Customer Region"]}</td>
                <td>{s["Customer Type"]}</td>
                <td>{s["Product ID"]}</td>
                <td>{s["Product Name"]}</td>
                <td>{s["Brand"]}</td>
                <td>{s["Product Category"]}</td>
                <td>{Array.isArray(s["Tags"]) ? s["Tags"].join(", ") : s["Tags"]}</td>
                <td>{s["Quantity"]}</td>
                <td>{s["Price per Unit"]}</td>
                <td>{s["Discount Percentage"]}</td>
                <td>{s["Total Amount"]}</td>
                <td>{s["Final Amount"]}</td>
                <td>{s["Payment Method"]}</td>
                <td>{s["Order Status"]}</td>
                <td>{s["Delivery Type"]}</td>
                <td>{s["Store ID"]}</td>
                <td>{s["Store Location"]}</td>
                <td>{s["Salesperson ID"]}</td>
                <td>{s["Employee Name"]}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={prevPage} disabled={page === 1}>
          Prev
        </button>

        <div>
          {(() => {
            const pages = [];
            const maxButtons = 7;
            let start = Math.max(1, page - Math.floor(maxButtons / 2));
            let end = start + maxButtons - 1;
            if (end > totalPages) {
              end = totalPages;
              start = Math.max(1, end - maxButtons + 1);
            }
            for (let p = start; p <= end; p++) {
              pages.push(
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  style={{
                    margin: "0 4px",
                    fontWeight: p === page ? "700" : "400",
                    textDecoration: p === page ? "underline" : "none",
                  }}
                >
                  {p}
                </button>
              );
            }
            return pages;
          })()}
        </div>

        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>

        <div style={{ marginLeft: 12 }}>
          Page {page} of {totalPages} — {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}