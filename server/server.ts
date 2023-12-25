import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import GeminiRouter from "./src/routes/index";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", GeminiRouter);

// Error Handler
class CustomError extends Error {
  status: number;

  constructor(message?: string, status?: number) {
    super(message);
    this.status = status || 500;
  }
}

app.use((err: CustomError, req: Request, res: Response) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong, Try again!";

  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
    success: false,
  });
});

// Server
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
