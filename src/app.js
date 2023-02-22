import express from "express";
import ProductManager from "./productManager.js";

const app = express();
let manager = new ProductManager("./dataproductos.json");


app.get("/", (req, res) => {
  res.send("<h1>Hola!</h1>");
});

app.get("/products", async (req, res) => {
  try {
    const products = await manager.getProducts();
    const { limit } = req.query;

    if (limit) {
      products.length = limit;
      return res.send(products);
    } else {
      res.send(products);
    }
  } catch (e) {
    res.status(404).send(`${e}`);
  }
});

app.get("/products/:id", async (req, res) => {
  let num = parseInt(req.params.id);
  res.send(manager.getProductById(num));
});

app.get("/products", async (req, res) => {
  const product = await manager.getProducts();
  let { limit } = req.query;
  res.send(product.filter((x) => x.id < limit));
});

app.listen(8080, () => console.log(`Server listening to port 8080`));
