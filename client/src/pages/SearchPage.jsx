import React, { useState } from "react";
import { Link } from "react-router-dom";
import { category } from "../utils/data"; // Adjust the path as needed

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filteredResults = category.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Search Food Items</h1>
      <input
        type="text"
        placeholder="Type a food name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "250px" }}
      />
      <button onClick={handleSearch} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
        Search
      </button>
      <div style={{ marginTop: "1rem" }}>
        {results.length > 0 ? (
          results.map((item) => (
            // When clicked, redirect to the order page with the item's id
            <Link
              key={item.id}
              to={`/order/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <img src={item.img} alt={item.name} style={{ width: "100px", marginRight: "1rem" }} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.off}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No matching results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
