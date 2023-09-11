import {useCallback, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/user.jsx";
import {getGardenInfo, getGardenLog, setGardenLog} from "../../controller/api.jsx";

const HomeDailyWrite = () => {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(()=>{
        if(location.pathname === "/"){
            navigate("/home",{replace: true});
        }
    },[])


    const [title, setTitle] = useState();
    const [content, setContent] = useState();




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


    const [logs,setLogs] = useState();

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
            console.log(res);
        })


    },[])


    return <div >
        <Header />
        <div className={"flexColumn"} style={{padding:"0px 20px", alignItems:"start", position:"relative"}}>
            <div className={"h20"}/>
            <div className={"flexRow wfull relative"} style={{justifyContent:"end"}}>
                <div
                    className={"designText7"}
                    onClick={()=>{
                        setGardenLog({
                            "token": gardenToken,
                            "garden_id": parseInt(queryString),
                            "title": title,
                            "description": content
                        }).then(res => {
                            console.log(gardenToken)
                            console.log(queryString)
                            console.log(res)
                        })
                        navigate(`/home/daily?id=${queryString}`)
                    }}>등록</div>
                <img src={"/img/IconHeaderLeft.png"} className={"absolute pointer"} style={{left:"0px"}} onClick={()=>{navigate(`/home/garden?id=${queryString}`)}}/>
            </div>
            <div className={"h20"}/>



            <input
                className={"designText2"}
                style={{borderBottom:"1px solid #EFEFEF", width:"100%", padding:"20px"}}
                placeholder={"제목을 입력하세요"}
                value={title}
                onChange={(event)=>{
                    setTitle(event.target.value)
                }}
            />

            <div className={"h20"}/>
            <textarea
                className={"designText2"}
                style={{border:"1px solid #EFEFEF", width:"100%", resize:"none", padding:"20px", height:"60vh"}}
                placeholder={"내용을 입력하세요"}
                value={content}
                onChange={(event)=>{
                    setContent(event.target.value)
                }}
            />
            <div className={"h20"}/>



        </div>
    </div>
}
export default HomeDailyWrite;