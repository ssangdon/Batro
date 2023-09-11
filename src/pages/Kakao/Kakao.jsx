import { useEffect } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import querystring from "query-string";
import { authKakaoLoginVerify } from "../../controller/api";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";

const Kakao = () => {
    const [user,setUser] = useRecoilState(userState);
    let location = useLocation();
    let qs = querystring.parse(location.search);
    let { type } = useParams();
    let navigate = useNavigate();

    
    useEffect(()=>{
        switch(type){
            case "callback": 
                if(qs.code){
                    authKakaoLoginVerify({
                        code: qs.code
                    })
                    .then(res => {
                        let { code, message, data } = res.data;
                        if(code===200){
                            setUser({
                                token: data.token,
                                ...data.user
                            });
                            localStorage.setItem("garden-token", data.token);
                        }else{
                            alert("로그인 실패");
                        }
                        navigate("/",{replace: true});
                    })
                }
                break;
            case "logout": 
                    localStorage.removeItem("garden-token");
                    navigate("/",{replace: true});
                    window.location.reload();
                break;
            default :
                navigate("/",{replace: true});
                break;
        }
        
    },[])
    return null;
}
export default Kakao;