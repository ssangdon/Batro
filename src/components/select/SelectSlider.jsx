import "./SelectSlider.css";
const SelectSlider = ({
    keys,setSelectedKey,selectedKey
}) => {
    return <div className="SelectSliderWrapper" >
        {
            keys.map(key => <div 
                className="SelectSliderItem" 
                style={{color: selectedKey === key ? "#39BA5D" : "#6F6F6F"}}
                onClick={()=>{setSelectedKey(key)}}
            >
                {key}
            </div>)
        }
    </div>
}
export default SelectSlider;