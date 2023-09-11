import "./Header.css";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { insertUserState, userState } from "../../recoil/user";
import * as api from "../../controller/api";
import {Fragment, useEffect, useState} from "react";
const Header = ({
    onBackButtonClick=null,
    title = "타이틀"
}) => {
    const [user,setUser] = useRecoilState(userState);
    const insertUser = useSetRecoilState(insertUserState);

  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    // console.log(user)
    if (localStorage.getItem("garden-token") != null || user.token !== "") {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);

  const signIn = () => {
    api.authKakaoLogin();
  };
  const logOut = () => {};

    const handleBack = () => {
        window.history.back();
    }

    return (<Fragment>
        {/* <div style={{height: 50}} />
        <div className="HeaderWrapper" >
            <div className="pointer"  style={{width: 120,display: 'flex', alignItems: "center"}}  >
                {
                    onBackButtonClick ? <img style={{marginLeft: 20}} src="/images/backArrow.png" onClick={()=>{
                        onBackButtonClick()
                    }} /> : "ㅤ"
                }
            </div>
            <div>
                {title}
            </div>
            
            <div className="pointer"  style={{width: 120}} >
                {
                    !isSignedIn 
                    ?
                    <a href={api.getAuthKakaoLoginUri()}>
                        로그인
                    </a>
                    :
                    <div>ㅤ</div>
                }
                
            </div>
        </div> */}
    </Fragment>
  );
};
export default Header;
