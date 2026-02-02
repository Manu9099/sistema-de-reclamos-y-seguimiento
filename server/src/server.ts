import express from "express";
import authRouter from "./modules/auth/auth.routes";
import complaintsRouter from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/complaints", complaintsRouter);

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando ✅");
});



app.listen(3000, () => console.log("🚀 Server running on port 3000"));
