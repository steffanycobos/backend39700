import { Router} from "express";
import { urlencoded } from "express";
import { getProductsController, addProductsController, getProductByIdController, updateProductController, deleteProductController,mockingController} from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/authenticate.js";
import { uploaderProducts } from "../utils.js";



const productsRouter = Router();

productsRouter.use(urlencoded({ extended: true }));
productsRouter.get('/mockingproducts',mockingController)
productsRouter.get('/', getProductsController)
productsRouter.post('/add', checkRole(['premium','admin']) ,uploaderProducts.single('thumbnail'),addProductsController)
productsRouter.get('/:pid', getProductByIdController )
productsRouter.put('/:pid', checkRole(['admin']), updateProductController)
productsRouter.delete('/:pid', checkRole(['admin', 'premium']), deleteProductController)


export default productsRouter;