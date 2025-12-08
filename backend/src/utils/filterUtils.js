// Search + Filters
export const applyFilters = (data, query) => {
  let result = [...data];

  // Search by customer name or phone
  if (query.search) {
    result = result.filter(item =>
      item.customerName?.toLowerCase().includes(query.search.toLowerCase()) ||
      item.phoneNumber?.includes(query.search)
    );
  }

  // Gender filter
  if (query.gender) {
    const genders = query.gender.split(",");
    result = result.filter(item => genders.includes(item.gender));
  }

  // Region filter
  if (query.region) {
    const regions = query.region.split(",");
    result = result.filter(item => regions.includes(item.customerRegion));
  }

  // Category filter
  if (query.category) {
    const categories = query.category.split(",");
    result = result.filter(item => categories.includes(item.productCategory));
  }

  return result;
};

// Sorting
export const applySorting = (data, sortBy) => {
  if (!sortBy) return data;

  if (sortBy === "customerName") {
    return data.sort((a, b) => a.customerName.localeCompare(b.customerName));
  }

  if (sortBy === "quantity") {
    return data.sort((a, b) => b.quantity - a.quantity);
  }

  if (sortBy === "date") {
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return data;
};

// Pagination
export const applyPagination = (data, page = 1, limit = 10) => {
  page = Number(page);
  limit = Number(limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    total: data.length,
    page,
    limit,
    results: data.slice(start, end)
  };
};
