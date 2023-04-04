import { Router } from "express";
import ProductManager from "../dao/db-managers/products.dao.manager.js";
import CartManager from "../dao/db-managers/carts.dao.manager.js";
import MessageManager from "../dao/db-managers/messages.dao.js";

const viewsRouter = Router();
const productManager = new ProductManager();
const cartManager= new CartManager()
const messageManager = new MessageManager();
viewsRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home",{products});
});

viewsRouter.get("/real-time-products", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("real_time_products", { products });
});

viewsRouter.get("/chat", async (req, res) => {
  try {
    const { err, result } = await messageManager.getMessages();
    res.render("chat", { messages: result });
  } catch (error) {
    res.send("error");
  }
});
viewsRouter.get('/products/:pid', async (req,res)=>{  try {
  const pid= req.params.pid
  const products =await  productManager.getProductById(pid);
  res.render("products", { products});
} catch (err) {
  res.send(err);
}

})

viewsRouter.get('/carts/:cid', async (req,res)=>{
const cid= req.params.cid
const cart= await cartManager.checkCart(cid)
res.render("carts", { cart});
})

export default viewsRouter;
