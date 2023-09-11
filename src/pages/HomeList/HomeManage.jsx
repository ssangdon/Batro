import {useCallback, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/user.jsx";
import {deleteGardenMember, getGardenInfo} from "../../controller/api.jsx";

const HomeManage = () => {
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


    const [members, setMembers] = useState()
    useEffect(() => {

        getGardenInfo(gardenToken).then(r => {
            r.data.data.gardens.map((item,idx)=>{
                console.log(item)
                if(item.garden_id === parseInt(queryString)){
                    console.log(item.members)
                    setData(item)
                    getAddress(item.location.y, item.location.x)


                    setMembers(item.members.filter((x) => x.type !== "admin"))
                }
            })
        })



    },[])

    const [id, setId] = useState();
    return <div >
        <Header />
        <div className={"flexColumn"} style={{padding:"0px 20px", alignItems:"start"}}>
            <div className={"h20"}/>
            <div className={"flexRow wfull relative"} style={{justifyContent:"center"}}>
                <div className={"designText7"}>구성원 관리</div>
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
            <div className={"designText9"}>현재 구성원</div>
            <div className={"h12"}/>

            {members?.map((item,idx)=>{
                return (
                    <div className={"flexRow wfull"} style={{justifyContent:"space-between", marginBottom:"16px", borderBottom:"1px solid #F5F5F5"}}>
                        <div className={"flexRow"}>
                            <img src={item.user.image} style={{width:"40px", height:"40px", borderRadius:"12px"}}/>
                            <div className={"w16"}/>
                            <div className={"flexColumn start"}>
                                <div className={"designText2"}>{item.user.nickname}</div>
                                <div className={"designText8"}>밭 합류 일시 : {item.register_date?.split(" ")[0]}</div>
                            </div>
                        </div>
                        <div
                            className={"designBotton2 cursor"}
                            onClick={()=>{
                                deleteGardenMember({
                                    "token": gardenToken,
                                    "member_id":item.user_id,
                                    "garden_id": queryString
                                }).then((res)=>{
                                    console.log(res)
                                    getGardenInfo(gardenToken).then(r => {
                                        r.data.data.gardens.map((item,idx)=>{
                                            console.log(item)
                                            if(item.garden_id === parseInt(queryString)){
                                                console.log(item.members)
                                                setData(item)
                                                getAddress(item.location.y, item.location.x)


                                                setMembers(item.members.filter((x) => x.type !== "admin"))
                                            }
                                        })
                                    })

                                })
                            }}
                        >삭제하기</div>
                    </div>
                )
            })}

            {/*<div className={"h32"}/>*/}
            {/*<div className={"designText9"}>ID로 구성원 초대</div>*/}
            {/*<div className={"h12"}/>*/}

            {/*<div className={"flexRow wfull"}>*/}
            {/*    <input*/}
            {/*        className={"designText2"}*/}
            {/*        style={{borderBottom:"1px solid #EFEFEF", width:"70%"}}*/}
            {/*        placeholder={"ID를 입력하세요"}*/}
            {/*        value={id}*/}
            {/*        onChange={(event)=>{*/}
            {/*            setId(event.target.value)*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <div className={"w12"}/>*/}
            {/*    <div className={"designBotton2 cursor"}>초대하기</div>*/}
            {/*</div>*/}


        </div>
    </div>
}
export default HomeManage;