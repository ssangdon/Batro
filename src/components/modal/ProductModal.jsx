import { Dialog, Modal } from "@mui/material"
import { Children } from "react";
import ProductCardSmall from "../product/ProductCardSmall";

const ProductModal = ({opennedItemIndex,setOpennedItemIndex,item,itemIndex}) => {
    const handleClose = () => {
        setOpennedItemIndex(-1);
    }
    const isOpen = opennedItemIndex===itemIndex;
    
    return <Dialog 
        disableAutoFocus={true}
        open={opennedItemIndex===itemIndex}
        onClose={handleClose}
    >
        <div style={{padding: 20}} >
            <ProductCardSmall 
                opennedItemIndex={opennedItemIndex}
                setOpennedItemIndex={setOpennedItemIndex}
                width={"100%"} 
                price={item.price}
                title={item.title}
                thumbnailUri={item.thumbnailUri}
                index={itemIndex}
                shopName={item.shopName}
                platform={item.platform}
                uri={item.uri}
                isDialog={true}
            />
        </div>
    </Dialog>
    
}
export default ProductModal;