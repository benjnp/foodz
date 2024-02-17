import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";

type CartType = {
    items: CartItem[],
    addItem: ( product: Product, size: CartItem['size']) => void,
    addQuantity: ( cartItem: CartItem) => void,
    subtractQuantity: ( cartItem: CartItem) => void,
    totalPrice: number
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    addQuantity: () => {},
    subtractQuantity: () => {},
    totalPrice: 0
})



const CartProvider = ({children}: PropsWithChildren) => {

    const [ items, setItems ] = useState<CartItem[]>([])
    const [ totalPrice, setTotalPrice ] = useState(0)
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
        setTotalPrice((prev) => prev + product.price)
    }

    const addQuantity = (cartItem: CartItem) => {
        let tmpItems = items
        items.map((item, index) => {
            if(item.product.id == cartItem.product.id && item.size == cartItem.size)
                tmpItems[index].quantity++                
        })
        setItems(tmpItems)
        setTotalPrice((prev) => prev + cartItem.product.price)
    }

    const subtractQuantity = (cartItem: CartItem) => {
        let tmpItems = items
        items.map((item, index) => {
            if(item.product.id == cartItem.product.id && item.size == cartItem.size && item.quantity > 0) 
                tmpItems[index].quantity--     
            if(item.quantity == 0) 
                tmpItems.splice(index,1)           
        })
        setItems(tmpItems)
        setTotalPrice((prev) => prev - cartItem.product.price < 0 ? 0 : prev - cartItem.product.price)
    }

    return (
        <CartContext.Provider value={{items, totalPrice, addItem, addQuantity, subtractQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCartContext = () => useContext(CartContext)