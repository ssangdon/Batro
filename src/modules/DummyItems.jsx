const DummyItems = (value) => {
    const itemDummy = [
        {
            img:"https://shopping-phinf.pstatic.net/main_3773793/37737934138.jpg",
            name:"광신정밀 호미 선호미-대",
            price:16115,
            link:"http://e09mall.co.kr/product/product-detail.do?goods_code=3342846",
        },
        {
            img:"https://shopping-phinf.pstatic.net/main_8468960/84689605658.jpg",
            name:"곡괭이 텃밭 농기구",
            price:79690,
            link:"https://smartstore.naver.com/myorder/products/7145105336"
        },
        {
            img:"https://shopping-phinf.pstatic.net/main_8339943/83399430556.1.jpg",
            name:"잡초제거 잡초호미",
            price:19900,
            link:"https://smartstore.naver.com/speed-77/products/5854931142"
        },
        {
            img:"https://shopping-phinf.pstatic.net/main_8253204/82532045280.2.jpg",
            name:"방울토마토 키우기 재배키트",
            price:3000,
            link:"https://smartstore.naver.com/popick/products/4987524686"
        },
        {
            img:"https://shopping-phinf.pstatic.net/main_8612031/86120313209.jpg",
            name:"여름상추씨앗 모듬 혼합상추",
            price:3000,
            link:"https://smartstore.naver.com/jujuseed/products/8575812887"
        },
        {
            img:"https://shopping-phinf.pstatic.net/main_8301340/83013407331.10.jpg",
            name:"허브씨앗 허브씨",
            price:3000,
            link:"https://smartstore.naver.com/jujuseed/products/5468912844"
        },
    ]
    const itemBox = (item) => {


        return (
            <div className={"flexColumn start pointer"} style={{marginRight:"20px"}}
                 onClick={()=>{window.open(item.link,"_blank")}}>
                <img src={item.img} style={{width:"160px", height:"160px", borderRadius:"4px"}}/>
                <div className={"h8"}/>
                <div className={"designText5"}>{item.name}</div>
                <div className={"designText6"}>{item.price}원</div>
            </div>
        )
    }

    return (
        <div className={"flexRow"} style={{overflow:"scroll", width:"100%"}}>
            {itemDummy.map((item,idx)=>{
                return itemBox(item)
            })}
        </div>
    )
}
export default DummyItems;