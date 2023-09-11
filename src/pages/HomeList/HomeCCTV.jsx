import {useCallback, useEffect, useRef, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import VideoComponent from "./VideoComponent.jsx";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/user.jsx";
import {getGardenInfo} from "../../controller/api.jsx";

const HomeCCTV = () => {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(()=>{
        if(location.pathname === "/"){
            navigate("/home",{replace: true});
        }
    },[])

    const [videoState, setVideoState] = useState('초기 메세지');
    const playerRef = useRef(null);

    const videoOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: 'http://vjs.zencdn.net/v/oceans.mp4',
                type: 'video/mp4',
            },
        ],
        // loop:true
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
            setVideoState('동영상이 대기 중입니다.');
        });

        player.on('playing', () => {
            videojs.log('player is going now');
            setVideoState('동영상이 재생 중입니다.');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };


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
    },[])

    return <div >
        <Header />
        <div className={"flexColumn"} style={{padding:"0px 20px", alignItems:"start"}}>
            <div className={"h20"}/>
            <div className={"flexRow wfull relative"} style={{justifyContent:"center"}}>
                <div className={"designText7"}>실시간 영상 확인</div>
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
            <div className={"wfull"}>
                <VideoComponent
                    options={videoOptions}
                    onReady={handlePlayerReady}
                    videoState={videoState}
                    setVideoState={setVideoState}
                />
            </div>
            <div className={"h32"}/>
            <div className={"designText7"} style={{color:"#cccccc"}}>* 본 영상은 예시영상입니다.</div>


        </div>
    </div>
}
export default HomeCCTV;