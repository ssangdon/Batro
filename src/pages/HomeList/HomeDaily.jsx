import {useCallback, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/user.jsx";
import {getGardenInfo, getGardenLog} from "../../controller/api.jsx";

const HomeDaily = () => {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(()=>{
        if(location.pathname === "/"){
            navigate("/home",{replace: true});
        }
    },[])

    const queryString = location.search.split("=")[1];

    console.log(queryString)

    const gardenToken = window.localStorage.getItem("garden-token");

    const [user, setUser] = useRecoilState(userState);

    const { kakao } = window;
    const [data, setData] = useState(null);
    const [loc, setLoc] = useState()
    const getAddress = useCallback((lat, lng) => {
        const geocoder = new kakao.maps.services.Geocoder();

        const coord = new kakao.maps.LatLng(lat, lng);
        const callback = function (result, status) {
            console.log(result)
            console.log(status)
            if (status === window.kakao.maps.services.Status.OK) {
                setLoc(result[0].address.address_name)
            }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }, []);


    const [logs, setLogs] = useState();
    useEffect(() => {

        getGardenInfo(gardenToken).then(r => {
            r.data.data.gardens.map((item,idx)=>{
                console.log(item)
                if(item.garden_id === parseInt(queryString)){
                    setData(item)
                    getAddress(item.location.y, item.location.x)
                }
            })
        })


        getGardenLog({
            "token": gardenToken,
            "garden_id": queryString
        }).then((res)=>{
            console.log(res.data.data);
            setLogs(res.data.data);
        })


    },[])


    return <div >
        <Header />
        <div className={"flexColumn"} style={{padding:"0px 20px", alignItems:"start"}}>
            <img src={"/img/Rectangle 3771.png"} style={{
                position: "absolute",
                bottom: "40px",
                right: "20px",
                cursor: "pointer",}} onClick={()=>{navigate(`/home/write?id=${queryString}`)}}/>
            <div className={"h20"}/>
            <div className={"flexRow wfull relative"} style={{justifyContent:"center"}}>
                <div className={"designText7"}>텃밭일지</div>
                <img src={"/img/IconHeaderLeft.png"} className={"absolute pointer"} style={{left:"0px"}} onClick={()=>{navigate(`/home/garden?id=${queryString}`)}}/>
            </div>
            <div className={"h20"}/>
            <div className={"flexRow"} style={{justifyContent:"space-between"}}>
                <img src={data?.garden_image} style={{width:"40px", height:"40px", borderRadius:"12px"}}/>
                <div className={"w16"}/>
                <div className={"flexColumn start"}>
                    <div className={"designText2"}>{loc}</div>
                    <div className={"designText8"}>이용기간 : {data?.garden_lease_term.start_date.split(" ")[0]} - {data?.garden_lease_term.end_date.split(" ")[0]}</div>
                </div>
            </div>
            <div className={"h32"}/>
            {logs?.map((item,idx)=>{
                return(
                    <div className={"flexColumn"} style={{alignItems:"start", marginBottom:"12px"}}>
                        <div className={"designText2"}>{item.title}</div>
                        <div className={"designText8"} style={{textAlign:"start"}}>{item.description}</div>
                        <div className={"designText8"}>{item.register_date.split("T")[0]} | {item.nickname}</div>
                    </div>
                )
            })}
        </div>
    </div>
}
export default HomeDaily;