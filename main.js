class ProductManager {
    products = [];
    constructor() { }                    //Obtener productos
    getProducts() {
        return console.log(this.products);
    }

    addProducts(title, description, price, thumbnail, code, stock) {                    //Agregar producto sin repetir el code
        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        let cd = this.products.find((x) => x.code === code);
        if (!cd) {
            this.products = [...this.products, newProduct];
        } else {
            throw new Error(`El código ${code} ya esta registrado.`);
        }
    }

    getProductById(id) {               // Producto por ID
        let element = this.products.find((x) => x.id === id)
        if (element) {
            return console.log(element)
        } else {
           
            throw new Error(`Product with id: ${id} Not Found`);

        }
    }
}
const manager = new ProductManager();

                               ///// Testing 
manager.getProducts();
manager.addProducts(
    "Producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
);
manager.getProducts();
manager.getProductById(1)
manager.addProducts(
    "Producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
);