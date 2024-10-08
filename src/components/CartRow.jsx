import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { Link } from 'react-router-dom';

const CartRow = ({ img, title, price, Quantity, setSelectedItems, selectedItems, rowKey,setCartProducts,Cartproducts }) => {

    let total = price * Quantity;
    
    function handleCheckboxClick(e) {

        if (e.target.checked) {
            const selectedItemsArray = [...selectedItems];
            const totalElement = e.target.closest('.div-2').querySelector('#total');
            const priceElement = e.target.closest('.div-2').querySelector('#price')
            const quantityElement = e.target.closest('.div-2').querySelector('#quantity')
            if (totalElement) {
                const itemObj = {
                    id: Number(totalElement.getAttribute('elekey')),
                    Quantity:Number(quantityElement.textContent),
                    price: Number(priceElement.textContent),
                };
                selectedItemsArray.push(itemObj);
                setSelectedItems(selectedItemsArray);
            }
        } else {
            const totalElement = e.target.closest('.div-2').querySelector('#total');
            const filteredItems = selectedItems.filter(item => item.id !== Number(totalElement.getAttribute('elekey')));
            setSelectedItems(filteredItems);
        }
    }

    function increaseQuantity(e) {
        let NewProducts = Cartproducts.map((product) => {
            if(product.id == Number(e.target.closest('.div-2').getAttribute('elekey'))){
                product.Quantity=product.Quantity+1;
                let NewselectedProducts = selectedItems.map((selectedProduct)=>{
                     if(selectedProduct.id==product.id){
                        selectedProduct.Quantity=selectedProduct.Quantity+1;
                        return selectedProduct
                     }
                     else{
                        return selectedProduct
                     }
                })
                setSelectedItems(NewselectedProducts)
                return product;
            }
            else{
                return product;
            }
        })

       
        setCartProducts(NewProducts)
    }

    function decreaseQuantity(e) {
        let NewProducts = Cartproducts.map((product) => {
            if(product.id == Number(e.target.closest('.div-2').getAttribute('elekey'))){
                product.Quantity=product.Quantity-1;
                let NewselectedProducts = selectedItems.map((selectedProduct)=>{
                     if(selectedProduct.id==product.id){
                        selectedProduct.Quantity=selectedProduct.Quantity-1;
                        return selectedProduct
                     }
                     else{
                        return selectedProduct
                     }
                })
                setSelectedItems(NewselectedProducts)
                return product;
            }
            else{
                return product;
            }
        })

       
        setCartProducts(NewProducts)
    }

    return (
        <div className='px-2 py-2 flex sm:justify-between  div-2 border-[1px] rounded-md border-gray-300 items-center max-sm:flex-col max-sm:gadiv-1 max-sm:mt-4 hover:cursor-pointer max-sm:hidden mb-2 div-2' elekey={rowKey}>
            <div className='flex items-center '>
                <div className='self-start'><input type="checkbox" onClick={handleCheckboxClick} /></div>
                <div className=' flex justify-center items-center'><Link to={'/product-details'}><img src={img} alt="" width={100} height={100} className='max-sm:w-[100px] ' /></Link></div>
            </div>
            <div className='sm:basis-[65px] flex justify-center items-center text-lg font-medium hover:underline hover:underline-offset-2 hover:decoration-blue-500'><Link to={'/product-details'}>{title}</Link></div>
            <div className='sm:basis-[90px]  flex justify-center items-center gap-1' id='price'>{price} <div className='text-md'><FaRupeeSign /></div></div>
            <div className='flex gap-2 items-center'>
                <div className='border-2 border-gray-400 hover:border-black hover:cursor-pointer rounded-md' onClick={increaseQuantity}><FiPlus /></div>
                <div id='quantity'>{Quantity}</div>
                <div className='border-2 border-gray-400 hover:border-black hover:cursor-pointer  rounded-md' onClick={decreaseQuantity}><LuMinus /></div>
            </div>
            <div className='sm:basis-[90px] flex justify-center items-center gap-1' id='total' elekey={rowKey}>{total}<div className='text-md'><FaRupeeSign /></div></div>
            <div className='sm:basis-[70px]  flex justify-center items-center  h-8 divx-4 rounded-md cursor-pointer gap-1'><div className='text-xl hover:scale-125 duration-100 hover:text-red-500'><MdDelete /></div></div>
        </div>
    )
}

export default CartRow