export default function Filters() {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "15px",
        flexWrap: "wrap",
      }}
    >
      <select>
        <option>Region</option>
        <option>North</option>
        <option>South</option>
        <option>East</option>
        <option>West</option>
      </select>

      <select>
        <option>Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <select>
        <option>Payment Method</option>
        <option>Cash</option>
        <option>Card</option>
        <option>UPI</option>
      </select>
      <select>
        <option>Age</option>
        <option>18-25</option>
        <option>26-35</option>
        <option>36-45</option>
        <option>46-55</option>
        <option>51+</option>
    
      </select>
      <div className="filter-item">
        <label>Tags:</label>
        {[
          "fashion", "casual", "cotton", "formal", "makeup",
          "organic", "beauty", "skincare", "fragrance-free",
          "unisex", "portable", "wireless", "gadgets",
          "accessories", "smart"
        ].map(tag => (
        <div key={tag}>
          <input
          type="checkbox"
          checked={tags.includes(tag)}
          onChange={() => toggleTag(tag)}
          />
          <span>{tag}</span>
          </div>
        ))}
        </div>

    </div>
  );
}
