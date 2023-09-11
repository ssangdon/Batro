import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import Button from "@mui/material/Button";
import DummyItems from "../../modules/DummyItems.jsx";
import { userState } from "../../recoil/user";
import { useRecoilState } from "recoil";

const weatherAPI = {
  key: "8d91851971aefc0f6312967b9d4108f3",
  base: "https://api.openweathermap.org/data/2.5/",
};

const GardenDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const windowHeight = useRef(window.innerHeight);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [user, setUser] = useRecoilState(userState);

  const [weather, setWeather] = useState();
  const [information, setInformation] = useState({
    price: location.state?.price,
    currentParty: location.state?.currentParty,
    maxParty: location.state?.maxParty,
    imgSrc: location.state?.imgSrc,
    address: location.state?.address,
    lat: location.state?.lat,
    lng: location.state?.lng,
    gardenId: location.state?.garden_id,
  });
  let len = information.maxParty;
  let arr = new Array(len).fill(false);
  const [isSelected, setIsSelected] = useState(arr);
  const handleClick = idx => {
    let newArr = isSelected;
    newArr[idx] = !newArr[idx];
    setIsSelected(newArr);
  };
  const handlePrice = () => {
    let num = isSelected.filter(d => d === true).length;
    setSelectedPrice(num * information.price);
  };
  const getWeatherInfo = async (lat, lng) => {
    let url = `${weatherAPI.base}weather?lat=${lat}&lon=${lng}&appid=${weatherAPI.key}&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    if (data.cod === 200) {
      let result = Object.assign(data.main, data.wind);
      setWeather(result);
    } else {
      alert("평균 날씨 데이터 가져오기 실패!");
    }
  };
  useEffect(() => {
    getWeatherInfo(information.lat, information.lng);
  }, []);

  return (
    <div style={{ padding: "5%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: 100, textAlign: "left" }}>
          <img
            src="/images/backArrow.png"
            onClick={() => {
              window.history.back();
            }}
          />
        </div>
        <div style={{ color: "#555555", margin: "3% 0" }}>밭 상세보기</div>
        <div style={{ width: 100 }} />
      </div>

      <div style={{ width: "100%" }}>
        <img
          alt="img1"
          width="100%"
          height={220}
          src={`${information.imgSrc}`}
        />
      </div>

      <div
        style={{
          textAlign: "left",
          marginBottom: "2%",
        }}
      >
        <div
          style={{
            color: "#3D3D3D",
            fontSize: "16px",
            fontWeight: 500,
            margin: "3% 0 1% 0",
          }}
        >
          마지기당
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#3D3D3D",
            marginBottom: "20px",
          }}
        >
          월 {information.price}원
        </div>
        <div
          style={{ border: "1px solid #F5F5F5", marginBottom: "20px" }}
        ></div>
        <div
          style={{
            color: "#1A1A1A",
            fontSize: "14px",
            fontWeight: 700,
            marginBottom: "14px",
          }}
        >
          텃밭 정보
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            <img src="/img/Vectorping.png" width={16} height={20}></img>
          </div>
          <div style={{ fontWeight: 500, fontSize: "16px", color: "#3D3D3D" }}>
            {information.address}
          </div>
        </div>
        <div
          style={{ marginRight: "8px", display: "flex", marginBottom: "20px" }}
        >
          <div style={{ marginRight: "7px" }}>
            <img src="/img/grass.png" width={18} height={18}></img>
          </div>
          <div style={{ fontWeight: 500, fontSize: "16px", color: "#3D3D3D" }}>
            배정된 밭 마지기 수 : {information.currentParty}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontWeight: 500,
              fontSize: "14px",
              color: "#3D3D3D",
              width: "33%",
              display: "flex",
            }}
          >
            <div style={{ color: "#939393" }}>평균 기온 :</div>
            <div style={{ fontWeight: 500 }}>
              {" "}
              {Math.round(weather?.temp)}˚C
            </div>
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: "14px",
              color: "#3D3D3D",
              width: "33%",
              display: "flex",
            }}
          >
            <div style={{ color: "#939393" }}>평균 습도 : </div>
            <div style={{ fontWeight: 500 }}> {weather?.humidity}%</div>
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: "14px",
              color: "#3D3D3D",
              width: "33%",
              display: "flex",
            }}
          >
            <div style={{ color: "#939393" }}>평균 풍속 : </div>
            <div style={{ fontWeight: 500 }}>{weather?.speed}m/s</div>
          </div>
        </div>
      </div>
      <div style={{ border: "1px solid #F5F5F5", margin: "20px 0" }}></div>
      <div
        style={{
          textAlign: "left",
        }}
      >
        <div
          style={{
            color: "#1A1A1A",
            fontWeight: 700,
            fontSize: "14px",
            margin: "20px 0 10px 0",
          }}
        >
          텃밭 소개글
        </div>
        <div
          style={{
            fontWeight: 500,
            fontSize: "16px",
            color: "#3D3D3D",
          }}
        >
          바람이 약하고 날씨가 따뜻하지만, 습도가 매우 높습니다!.
          <br />
          아래와 같은 작물을 키우길 추천드려요! <br />
          분명 좋은 경험이 될거에요!
        </div>
        <div style={{ border: "1px solid #F5F5F5", margin: "20px 0" }}></div>
      </div>
      <div
        style={{
          textAlign: "left",
          marginBottom: "3%",
        }}
      >
        <div
          style={{
            color: "#1A1A1A",
            fontWeight: 700,
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          추천 작물
        </div>
        <div
          style={{
            display: "flex",

            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "block",
              width: "20%",
            }}
          >
            <div>
              <img src="/img/potato.png" width={45} height={45}></img>
            </div>
            <div
              style={{ fontWeight: 600, fontSize: "15px", color: "#555555" }}
            >
              감자
            </div>
          </div>
          <div style={{ display: "block", width: "20%" }}>
            <div>
              <img src="/img/onion.png" width={45} height={45}></img>
            </div>
            <div
              style={{ fontWeight: 600, fontSize: "15px", color: "#555555" }}
            >
              양파
            </div>
          </div>
          <div style={{ display: "block", width: "20%" }}>
            <div>
              <img src="/img/tomato.png" width={45} height={45}></img>
            </div>
            <div
              style={{ fontWeight: 600, fontSize: "15px", color: "#555555" }}
            >
              토마토
            </div>
          </div>
          <div style={{ display: "block", width: "20%" }}>
            <div>
              <img src="/img/carrot.png" width={45} height={45}></img>
            </div>
            <div
              style={{ fontWeight: 600, fontSize: "15px", color: "#555555" }}
            >
              당근
            </div>
          </div>
          <div style={{ display: "block", width: "20%" }}>
            <div>
              <img src="/img/pepper.png" width={45} height={45}></img>
            </div>
            <div
              style={{ fontWeight: 600, fontSize: "15px", color: "#555555" }}
            >
              고추
            </div>
          </div>
        </div>
        <div style={{ border: "1px solid #F5F5F5", margin: "20px 0" }}></div>
        <div>추천 상품</div>
        {DummyItems()}
      </div>

      <div style={{ marginTop: "3%" }}>
        <Button
          variant="contained"
          style={{
            width: "100%",
            color: "white",
            backgroundColor: "#39BA5D",
            borderRadius: "16px",
          }}
          onClick={() => {
            if (user.token === undefined) {
              alert("로그인 후 이용해주세요");
            } else {
              navigate("/payment", {
                state: {
                  price: information.price,
                  address: information.address,
                  part: selectedPrice / information.price,
                  garden_id: information.gardenId,
                },
              });
            }
          }}
        >
          임대하기
        </Button>
      </div>
    </div>
  );
};

export default GardenDetail;
