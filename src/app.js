import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./utils.js";

const app = express();

app.use(express.static(__dirname + "/../public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => console.log(`Server listening to port 8080`));
