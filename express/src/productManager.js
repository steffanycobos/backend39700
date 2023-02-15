import fs from "fs";
import productos from "./data.js";
class ProductManager {
  constructor(path) {
    this.path = path;
  }
  #accumulator = 0;

  async getProducts() {
    //Obtener productos
    try {
      const prod = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(prod);
    } catch (e) {
      return [];
    }
  }
  async addProducts(title, description, price, thumbnail, code, stock) {
    //Agregar producto sin repetir el code
    const newProduct = {
      id: this.#accumulator,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    const prod = await this.getProducts();
    let cd = prod.find((x) => x.code === code);
    if (!cd) {
      fs.promises.writeFile(this.path, JSON.stringify([...prod, newProduct]));
      this.#accumulator += 1;
    } else {
      throw new Error(`El código ${code} ya esta registrado.`);
    }
  }
  getProductById(id) {
    // Producto por ID
    const prod = this.getProducts();
    let element = productos.find((x) => x.id === id);
    if (element) {
      //fs.promises.appendFile(`Producto con ID ${id}: ${JSON.stringify(element)}`)
      return element;
    } else {
      return `<h2>Product with ID: ${id} Not Found</h2>`;
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    // Actualiza producto
    let actual = [];
    const prod = await this.getProducts();
    actual = prod.find((x) => x.id === id);

    if (title === undefined) {
      title = prod[id - 1].title;
    } else {
      actual.title = title;
    }
    if (description === undefined) {
      title = prod[id - 1].description;
    } else {
      actual.description = description;
    }
    if (price === undefined || price !== Number) {
      price = prod[id - 1].price;
    } else {
      actual.price = price;
    }
    if (thumbnail === undefined) {
      thumbnail = prod[id - 1].thumbnail;
    } else {
      actual.thumbnail = thumbnail;
    }
    if (code === undefined) {
      code = prod[id - 1].code;
    } else {
      actual.code = code;
    }
    if (stock === undefined || stock !== Number) {
      stock = prod[id - 1].stock;
    } else {
      actual.stock = stock;
    }
    fs.promises.appendFile(
      this.path,
      `Listado de productos actualizados: ${JSON.stringify(prod)}`
    );
  }

  async deleteProduct(id) {
    // Elimina producto por ID
    const prod = await this.getProducts();
    let checkId = prod.find((x) => x.id === id);
    if (checkId) {
      let rest = prod.filter((x) => x.id !== id);
      fs.promises.appendFile(
        "./products.json",
        `Productos actuales:  ${JSON.stringify(rest)}`
      );
    } else {
      throw new Error(` No se encuentra ningún objeto con id: ${id}`);
    }
  }
}
const manager = new ProductManager("./product.json");


export default ProductManager;
