import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";

type CartType = {
    items: CartItem[],
    addItem: ( product: Product, size: CartItem['size']) => void,
    addQuantity: ( cartItem: CartItem) => void,
    subtractQuantity: ( cartItem: CartItem) => void,

}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    addQuantity: () => {},
    subtractQuantity: () => {},

})



const CartProvider = ({children}: PropsWithChildren) => {

    const [ items, setItems ] = useState<CartItem[]>([])
    let isDuplicate = false
    const addItem = ( product: Product, size: CartItem['size']) => {
        const newCartItem: CartItem = {
            // id: '1',
            product,
            size,
            quantity: 1
        }
        items.map((item) => {
            if(item.product.id == newCartItem.product.id && item.size == newCartItem.size) {
                addQuantity(newCartItem)  
                isDuplicate = true
            }      
        })
        if(!isDuplicate)
            setItems((prevItems) => {
                isDuplicate = false
                return [...prevItems, newCartItem]
            })
    }

    const addQuantity = (cartItem: CartItem) => {
        // console.log("Adding: ", cartItem)
        let tmpItems = items
        items.map((item, index) => {
            if(item.product.id == cartItem.product.id && item.size == cartItem.size)
                tmpItems[index].quantity++                
        })
        setItems(tmpItems)
    }

    const subtractQuantity = (cartItem: CartItem) => {
        // console.log("Adding: ", cartItem)
        let tmpItems = items
        items.map((item, index) => {
            if(item.product.id == cartItem.product.id && item.size == cartItem.size && item.quantity > 1) 
                tmpItems[index].quantity--                
        })
        setItems(tmpItems)
    }

    return (
        <CartContext.Provider value={{items, addItem, addQuantity, subtractQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCartContext = () => useContext(CartContext)