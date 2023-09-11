import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import "./PageLayout.css";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user.jsx";
import { useEffect, useState } from "react";
import {systemState} from "../../recoil/system.js";
const PageLayout = ({ children }) => {
  const [isFinishPreLoading, setIsFinishPreLoading] = useState(true);
    const [system, setSystem] = useRecoilState(systemState);
    const [user,setUser] = useRecoilState(userState);
    useEffect(()=>{
      if(system.isSigninChecked){
        console.log("after")
        console.log(system)
        console.log(user)
      }
      console.log(system)
      
    },[system]);
  return (
    <div className="PageLayoutWrapper" style={{ paddingBottom: 50 }}>
      <div className="InnerPageWrapper">
        {system.isSigninChecked ? children : null}
      </div>
      <Navigation setIsFinishPreLoading={setIsFinishPreLoading} />
    </div>
  );
};
export default PageLayout;
