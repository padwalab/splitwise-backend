import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import groupsRouter from "./routes/group";
import expenseRouter from "./routes/expense";
import membershipRouter from "./routes/membership";
import cors from "cors";

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/groups", groupsRouter);
app.use("/expense", expenseRouter);
app.use("/membership", membershipRouter);

export default app;
