import { fetchSalesData } from "../services/salesService.js";

export const getSalesData = (req, res) => {
  const result = fetchSalesData(req.query);
  res.json(result);
};
