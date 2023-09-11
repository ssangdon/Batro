import {useCallback, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/user.jsx";
import {antiJoinGarden, getGardenInfo, getGardenLog, regenerateInviteCode} from "../../controller/api.jsx";


const HomeGarden = () => {
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
                    console.log(item)
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
            <div className={"h20"}/>
            <div className={"flexRow wfull relative"} style={{justifyContent:"center"}}>
                <div className={"designText7"}>내 텃밭</div>
                <img src={"/img/IconHeaderLeft.png"} className={"absolute pointer"} style={{left:"0px"}} onClick={()=>{navigate("/home")}}/>
            </div>
            <div className={"h36"}/>
            <div className={"text1"}>텃밭정보</div>
            <div className={"h12"}/>
            <div className={"flexRow"} style={{justifyContent:"space-between"}}>
                <img src={data?.garden_image} style={{width:"120px", height:"120px", borderRadius:"12px"}}/>
                <div className={"w16"}/>
                <div className={"flexColumn start"}>
                    <div className={"designText2"}>{loc}</div>
                    <div className={"h12"}/>
                    <div className={"designText8"}>이용기간 : {data?.garden_lease_term.start_date.split(" ")[0]} - {data?.garden_lease_term.end_date.split(" ")[0]}</div>
                    <div className={"designText8"}>상태 : {data?.type === "admin" ? "관리자" : "구성원"}</div>
                    <div className={"flexRow flexAlign"}>
                        <div style={{ borderRadius: 16,padding: 4}} >
                            <div className={"designText8"}>초대코드</div>
                            <div className={"designText8"}>  {data?.invite_code}</div>
                        </div>
                        <div className={"w16"}/>
                        <div
                            className={"cursor"}
                            style={{borderRadius:"8px", padding:"2px 4px", backgroundColor:"#d9d9d9", fontWeight:"600", fontSize:"14px", color:"#666666",minWidth: 100}}
                            onClick={()=>{
                                regenerateInviteCode({
                                    "token": gardenToken,
                                    "garden_id": data.garden_id,
                                }).then(res =>{
                                    console.log(res)
                                    getGardenInfo(gardenToken).then(r => {
                                        r.data.data.gardens.map((item,idx)=>{
                                            console.log(item)
                                            if(item.garden_id === parseInt(queryString)){
                                                console.log(item)
                                                setData(item)
                                                getAddress(item.location.y, item.location.x)
                                            }
                                        })
                                    })
                                })
                            }}
                        >초대코드 재발급</div>
                    </div>
                    <div className={"h12"}/>
                    {data?.type === "admin" ?
                        <div className={"button1"} onClick={()=>{navigate(`/home/manage?id=${queryString}`)}}>
                            <div className={"button1Text"}>구성원 관리</div>
                            <img src={"/img/IconArrowSmallOrange.png"}/>
                        </div>
                        :
                        <div
                            className={"button1"}
                            onClick={()=>{
                                antiJoinGarden({
                                    "token": gardenToken,
                                    "garden_id": queryString
                                }).then(res => {
                                    console.log(res);
                                    navigate(`/home/`)
                                })
                            }}
                        >
                            <div className={"button1Text"}>텃밭 탈퇴하기</div>
                            <img src={"/img/IconArrowSmallOrange.png"}/>
                        </div>
                    }


                </div>
            </div>
            <div className={"h32"}/>
            <div className={"flexRow wfull jbetween"}>
                <div className={"designText9"}>텃밭 일지</div>
                <div className={"flexRow acenter cursor"} onClick={()=>{navigate(`/home/daily?id=${queryString}`)}}>
                    <div className={"designText3"}>전체보기</div>
                    <img src={"/img/IconArrowSmall.png"}/>
                </div>
            </div>
            <div className={"h16"}/>

            {data !== null && logs?.slice(0,2).map((item,idx)=>{
                return(
                    <div className={"flexColumn"} style={{alignItems:"start", marginBottom:"12px"}}>
                        <div className={"designText2"}>{item.title}</div>
                        <div className={"designText8"} style={{textAlign:"start"}}>{item.description}</div>
                        <div className={"designText8"}>{item.register_date.split("T")[0]} | {item.nickname}</div>
                    </div>
                )
            })}


            <div className={"h32"}/>
            <div className={"flexRow wfull jbetween"}>
                <div className={"designText9"}>실시간 텃밭 확인</div>
                <div className={"flexRow acenter cursor"} onClick={()=>{navigate(`/home/cctv?id=${queryString}`)}}>
                    <div className={"designText3"}>더 보러가기</div>
                    <img src={"/img/IconArrowSmall.png"}/>
                </div>
            </div>
            <div className={"h12"}/>
            <img src={"/img/Rectangle 3728.png"} style={{width:"100%", height:"200px"}}/>

            <div className={"h32"}/>
        </div>
    </div>
}
export default HomeGarden;