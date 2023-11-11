import express, { urlencoded } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/User.js";
import productRouter from "./routes/Product.js";
import cookieParser from "cookie-parser";
import departmentRouter from "./routes/department.js";
import categoryRouter from "./routes/category.js";
import itemRouter from "./routes/item.js";
import orderRouter from "./routes/order.js";
import vendorRouter from "./routes/vendor.js";
import dynamicPdfRouter from "./routes/dynPdf.js"
import cors from "cors";

const app = express();
config({ path: "./config/config.env" });
connectDB();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
  })
);

app.get("/api/:month", (req, res) => {
  const month = req.params.month;
  if (month === "May-June")
    res.json({
      Orders: [300, 100, 250, 150, 300, 100, 200, 500, 360, 700, 800, 350],
    });
  else if (month === "April-May")
    res.json({
      Orders: [200, 120, 280, 180, 400, 150, 200, 500, 360, 700, 800, 350],
    });
  else if (month === "March-April")
    res.json({
      Orders: [250, 80, 220, 130, 320, 90, 200, 500, 360, 700, 800, 350],
    });
});

app.get("/",()=>{
  res.status(200).json({
    message:"Hello"
  })
})

app.use("/api/v1", router);
app.use("/api/v1", productRouter);
app.use("/api/v1", departmentRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", vendorRouter);
app.use("/api/v1", dynamicPdfRouter);
app.listen(process.env.PORT, () => {
  console.log("Server is Listening on port 9090");
});
