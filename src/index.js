import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRoutes } from "./routes/auth.js";
import { customerRoutes } from "./routes/customers.js";
import { invoiceRoutes } from "./routes/invoices.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);

// Error handling
app.use(errorHandler);

const PORT = config.port || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
