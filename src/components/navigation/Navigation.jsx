import { useEffect, useState } from "react";
import "./Navigation.css";
import { useLocation, useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/user.jsx";
import {getUserInfo} from "../../controller/api.jsx";
import {systemState} from "../../recoil/system.js";

let GNBList = [
    {
        image: null,
        title: "홈",
        key: "home"
    },
    {
        image: null,
        title: "텃밭찾기",
        key: "find"
    },
    {
        image: null,
        title: "마켓",
        key: "market"
    },
    {
        image: null,
        title: "커뮤니티",
        key: "community"
    },
    {
        image: null,
        title: "더보기",
        key: "more"
    }
];

const Navigation = ({ setIsFinishPreLoading }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const navigationWhiteList = GNBList.map(GNB=>GNB.key);
    const currentKey = location.pathname.split("/")[1];
    const [selectedGNBKey,setSelectedGNBKey] = useState(currentKey);
    const [user, setUser] = useRecoilState(userState);
    const [system, setSystem] = useRecoilState(systemState);
    const gardenToken = localStorage.getItem("garden-token");


    useEffect(()=>{
        if(localStorage.getItem("garden-token") != null) {
            getUserInfo(localStorage.getItem("garden-token")).then(r => {
                if(r?.data?.data?.token){
                    localStorage.setItem("garden-token", r.data.data.token);
                    setUser({
                        token: r.data.data.token,
                        ...r.data.data.user
                    });
                }
                
                
                setSystem({
                    isSigninChecked: true
                });
                setIsFinishPreLoading(true);
            })
        }
        else{
            setSystem({
                isSigninChecked: true
            });
        }



    },[])
    
    const handleClick = (GNB) => {
        if(gardenToken === null){
            alert("접근 권한이 없습니다. 로그인을 해 주세요.")
        }
        else{
            setSelectedGNBKey(GNB.key);
            navigate(`/${GNB.key}`);
        }

    }
    
    return <div className="NavigationWrapper" style={{display: navigationWhiteList.indexOf(currentKey)!==-1 ? "flex" : "none" }} >
        {gardenToken === null ?
            ""
            :
            <div className="GlobalNavigationWrapper" >
                {
                    GNBList.map((GNB,GNBIndex)=><div
                        onClick={()=>{handleClick(GNB)}}
                        className="GlobalNavigationButton"
                        style={{
                            width: `calc(100% / ${GNBList.length})`,
                            opacity: selectedGNBKey === GNB.key ? 0.7 : 1.0
                            // backgroundColor: selectedGNBKey === GNB.key  ? "red" : "green"
                        }}
                    >
                        <img src={`/images/reg_home_btn[off]-${GNBIndex+1}.png`} />
                    </div>)
                }
            </div>
        }

    </div>
}
export default Navigation;