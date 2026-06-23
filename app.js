// server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Database Connection
const connectDB = require("./config/db");
connectDB();

const app = express();

// =====================================
// Trust Proxy (Render / Nginx / Hosting)
// =====================================
app.set("trust proxy", 1);

// =====================================
// CORS Configuration (Allow All Origins)
// =====================================
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =====================================
// Body Parser Middleware
// =====================================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// =====================================
// Rate Limiter
// =====================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

// =====================================
// Routes
// =====================================
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const productRoutes = require("./routes/productRoutes");
const companyRoutes = require("./routes/companyRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const downloadRoute = require("./routes/downloadRoutes");
const pdfRoutes = require("./routes/pdfRoutes")
// =====================================
// API Routes
// =====================================
app.use("/api/auth", authRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/categories", require("./routes/categoryRoutes"));
app.use("/api/downloded", require("./routes/downloadRoutes"));
app.use("/api", require("./routes/pdfRoutes"));
// =====================================
// Health Check Route
// =====================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully 🚀",
  });
});

// =====================================
// 404 Handler
// =====================================
app.use((req, res, next) => {
  const error = new Error(`Route Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// =====================================
// Global Error Handler
// =====================================
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// =====================================
// Start Server
// =====================================
const PORT = process.env.PORT || 5016;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
