const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const expenseRoutes = require("./routes/expense.routes");


const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running...");
});

module.exports = app;
