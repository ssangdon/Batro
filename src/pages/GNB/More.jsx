import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { Fragment, useState } from "react";
import { userState } from "../../recoil/user";
import * as api from "../../controller/api";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRecoilState } from "recoil";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import InputText from "../../components/input/InputText";
import InputSubmit from "../../components/input/InputSubmit";
const More = () => {
  const [user, setUser] = useRecoilState(userState);
  const isSignedIn = user.token !== "";
  const navigate = useNavigate();
  const [inviteCode,setInviteCode] = useState("");
  const [newNickname,setNewNickname] = useState("");
  const handleClickInvite = () => {
    if(isSignedIn){
      if(inviteCode.length===0){
        alert("코드를 입력하세요.");
      }else{
        api.joinGarden({
            invite_code: inviteCode
        })
        .then(res=>{
          const {message, data ,code} = res.data;
          if(code===200){
            alert("텃밭에 가입되었습니다.");
            navigate("/home");
          }else{
            alert("잘못된 입력입니다.");
          }
        })
        .catch(err=>{
          alert("텃밭 가입 과정에 오류가 발생했습니다.");
        })
      }
    }else{
      alert("로그인이 필요한 서비스 입니다.");
    }
  }

  const handleClickChangeNickname = () => {
    if(isSignedIn){
      if(newNickname.length===0){
        alert("새로운 닉네임을 입력하세요.");
      }else{
        api.changeNickname({
          newNickname: newNickname
        })
        .then(res=>{
          const {message, data ,code} = res.data;
          if(code===200){
            alert("닉네임이 변경되었습니다.");
            api.getUserInfo(user.token).then(r => {
                if(r?.data?.data?.token){
                    localStorage.setItem("garden-token", r.data.data.token);
                    console.log({
                      token: r.data.data.token,
                      ...r.data.data.user
                  })
                    setUser({
                        token: r.data.data.token,
                        ...r.data.data.user
                    });
                }else{
                  alert("유저 데이터를 받아오지 못했습니다.");
                }
            })
          }else{
            alert("잘못된 입력입니다.");
          }
        })
        .catch(err=>{
          console.log(err)
          alert("닉네임 변경 과정에 과정에 오류가 발생했습니다.");
        })
      }
    }else{
      alert("로그인이 필요한 서비스 입니다.");
    }
  }

  return (
    <div>
      <Header title="더보기" />

      <div style={{ padding: "5%", textAlign: "left" }}>
        <div
            className={"flexRow wfull relative"}
            style={{ justifyContent: "center" }}
        >
          <div className={"designText7"} style={{ marginBottom: "20px" }}>
            더보기
          </div>
        </div>

        <div style={{ fontSize: "18px", fontWeight: "600" }}>프로필</div>

        <div className={"flexRow flexAlign-column"} style={{width: "100%",marginTop: 20}}>
          <img src={user.image} style={{width: 60, height: 60,borderRadius: 8}} />
          <div className={"w16"}/>
          <div className={"flexColumn textAlign-left"}>
            <div className={"designText5"}>닉네임 : {user.nickname}</div>
            <div className={"designText5"}>이메일 : {user.e_mail}</div>
            <div className={"designText5"}>가입일 : {user.register_date.split("T")[0]}</div>
          </div>
        </div>
        <div className={"h12"}/>

        <div style={{ fontSize: "18px", fontWeight: "600" }}>관리</div>
        <div style={{ marginTop: "4%" }}>

          <Accordion style={{boxShadow: "none"}} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              style={{marginLeft: -16,minHeight: 32,height: 32,borderBottom: "none",boxShadow: "none"}}
            >
              <div style={{ width: "7%" }}>
                <img style={{ width: "24px" }} src="/img/market.png" />
              </div>
              <div style={{ width: "80%", color: "#555555",paddingLeft: 8 }}>초대코드 입력</div>
            </AccordionSummary>
            <AccordionDetails style={{boxShadow: "none"}} >
              <div style={{display: "flex", alignItems: "center", gap: 10}} >
                <InputText value={inviteCode} onChange={(e)=>{setInviteCode(e.target.value)}} />
                <InputSubmit onClick={handleClickInvite} text={"확인"} />
              </div>
            </AccordionDetails>
          </Accordion>


          {
            isSignedIn &&
            <Fragment>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                계정
              </div>


              <Accordion style={{boxShadow: "none", marginTop: "4%"}} >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{marginLeft: -16,minHeight: 32,height: 32,borderBottom: "none",boxShadow: "none"}}
                >
                  <div style={{ width: "7%"}}>
                    <img style={{ width: "24px" }} src="/img/market.png" />
                  </div>
                  <div style={{ width: "80%", color: "#555555",paddingLeft: 8}}>닉네임 변경</div>
                </AccordionSummary>
                <AccordionDetails style={{boxShadow: "none"}} >
                  <div style={{display: "flex", alignItems: "center", gap: 10}} >
                    <InputText value={newNickname} onChange={(e)=>{setNewNickname(e.target.value)}} />
                    <InputSubmit onClick={handleClickChangeNickname} text={"변경"} />
                  </div>
                </AccordionDetails>
              </Accordion>


              
                <a style={{ display: "flex", marginTop: "4%" }} href={api.getAuthKakaoLogoutUri()}>
                  <div style={{ width: "7%" }}>
                    <img style={{ width: "24px" }} src="/img/market.png" />
                  </div>
                  <div style={{ width: "80%", color: "#555555",paddingLeft: 8 }}>로그아웃</div>
                </a>

            </Fragment>
          }
        </div>
      </div>
    </div>
  );
};
export default More;
