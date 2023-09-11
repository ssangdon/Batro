import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { setGardenInfo } from "../../controller/api";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [price, setPrice] = useState(location.state.price);
  const [token, setToken] = useState("");
  const info = {
    address: location.state.address,
    section: location.state.part,
    gardenId: location.state?.garden_id,
  };

  const [date, setDate] = useState("");
  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일 ~ ${year}년 ${month + 1}월 ${day}일`;
  };
  useEffect(() => {
    let result = getDate();
    setDate(result);
  }, []);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div>
      <div style={{ paddingTop: "10%" }}>
        <div>{info?.address} 텃밭, 1 section을 임대합니다.</div>
      </div>
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #EAEAEA",
            marginTop: "3%",
            padding: "3% 0",
          }}
        >
          <div style={{ width: "30%", padding: "0 5%", color: "#8B8B8B" }}>
            이용기간
          </div>
          <div>{date}</div>
        </div>
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #EAEAEA",
            paddingBottom: "3%",
          }}
        >
          <div style={{ width: "30%", padding: "0 5%", color: "#8B8B8B" }}>
            금액
          </div>
          <div>{price}원</div>
        </div>
      </div>
      <div>
        <Button
          sx={{
            position: "absolute",
            bottom: "0",
            left: "0",
            backgroundColor: "#39BA5D",
            width: "100%",
            color: "white",
            height: "50px",
            borderRadius: "16px",
          }}
          onClick={() => {
            setGardenInfo(info.gardenId).then(res => {
              let { code } = res.data;
              if (code !== 200) {
                alert("텃밭 구매 과정에 문제가 생겼습니다.");
              } else {
                alert("텃밭 구매가 완료되었습니다.");
              }
            });
          }}
        >
          결제하기
        </Button>
        <Button
          sx={{
            position: "absolute",
            bottom: "0",
            left: "0",
            backgroundColor: "#39BA5D",
            width: "100%",
            color: "white",
            height: "50px",
            borderRadius: "16px",
          }}
          onClick={() => {
            setGardenInfo(info.gardenId).then(res => {
              let { code } = res.data;
              if (code !== 200) {
                alert("텃밭 구매 과정에 문제가 생겼습니다.");
              } else {
                alert(
                  "텃밭 구매가 완료되었습니다. 본 구매과정은 실제 데이터에 반영되지 않고 플로우만 보여줍니다."
                );
                navigate("/home");
              }
            });
          }}
        >
          결제하기
        </Button>
      </div>
    </div>
  );
};
export default Payment;
