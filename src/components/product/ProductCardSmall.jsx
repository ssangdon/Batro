import { Fragment, useEffect, useState } from "react";
import AutoComma from "../../modules/AutoComma";
import "./ProductCardSmall.css";
const ProductCardSmall = ({
    uri,
    title,
    price,
    width,
    thumbnailUri,
    platform,
    shopName,
    opennedItemIndex,
    setOpennedItemIndex,
    isDialog,
    index
}) => {

    const handleClick = () => {
        window.open(uri);
        // if(opennedItemIndex===index){
        //     setOpennedItemIndex(-1);    
        // }else{
        //     setOpennedItemIndex(index);
        // }
    }
    const isOpenned = opennedItemIndex===index;

    return <div className="ProductCardSmallWrapper" 
            style={{width: width,minWidth: width}} 
            onClick={handleClick}
        >
        <img className="ProductCardSmallImage" src={thumbnailUri}  style={{width: "100%"}} />
        <div>
            {
                isDialog && <Fragment>
                    <div className="ProductCardSmallTitle pointer" onClick={()=>{
                        window.open(uri)
                    }} >
                        구매하러 가기{">"}
                    </div>
                    <div className="ProductCardSmallPrice" >
                        {platform}
                    </div>
                    <div className="ProductCardSmallPrice" >
                        {shopName}
                    </div>
                </Fragment>
            }
            <div className="ProductCardSmallTitle" >
                {title}
            </div>
            <div className="ProductCardSmallPrice" >
                {AutoComma(price)}원    
            </div>
        </div>
    </div>
}
export default ProductCardSmall;