// This file contains the login route for the API. It uses the employee's email
// and password to authenticate them and then returns a JWT token to the client.

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const path = require("path");


// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

const SECRET_KEY = process.env.JWT_SECRET;

// Middleware to verify JWT token and add employee to request, login route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const employee = await prisma.employee.findUnique({ where: { email } });

  if (!employee || !(await bcrypt.compare(password, employee.password))) {
    return res.status(401).send("Invalid email or password");
  }

  const token = jwt.sign({ id: employee.id, isAdmin: employee.isAdmin }, SECRET_KEY, {
    expiresIn: 15 * 60, // 15 minutes
  });

  res.json({ token });
});

// Add other routes and middleware here

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//dashboard route
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});