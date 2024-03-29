
import { CartManager } from "../dao/factory.js";

let manager= CartManager;


export async function getCartService(){
    let carts= await manager.getCart()
    return carts
}

export async function addCartService(products){
    let carts= await manager.addCart(products)
    return carts
}

export async function checkCartService(id){
    let carts= await manager.checkCart(id)
    if (carts){
        return carts
    }  else {
       return  console.log("El carrito no existe.")
}}

export async function addProductToCartService(cartId,productId,quantity){
   let cart= await manager.addProductToCart(cartId,productId,quantity)
   return cart
}
export async function deleteProductService(cartId,productId){
    let cart= await manager.deleteProduct(cartId,productId)
    return cart
}

export async function deleteProductsInCartService(cid){
    let cart= manager.deleteProductsInCart(cid)
    return cart
}

export async function updateQuantityService(cid,pid,quantity){
    let cart= manager.updateQuantity(cid,pid,quantity)
    return cart
}

export async function ticketCartService(cid){
    let cart= manager.ticketCart(cid)
    return cart

}