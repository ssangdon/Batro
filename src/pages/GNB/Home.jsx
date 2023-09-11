import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { getAuthKakaoLoginUri, getGardenInfo } from "../../controller/api.jsx";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user.jsx";
import DummyItems from "../../modules/DummyItems.jsx";

const weatherAPI = {
  key: "8d91851971aefc0f6312967b9d4108f3",
  base: "https://api.openweathermap.org/data/2.5/",
  city: "Seoul",
};

const Home = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [weather, setWeather] = useState();
  const [weatherId, setWeatherId] = useState();

  const gardenToken = window.localStorage.getItem("garden-token");

  const getWeatherInfo = async () => {
    let url = `${weatherAPI.base}weather?q=${weatherAPI.city}&appid=${weatherAPI.key}&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    if (data.cod === 200) {
      setWeather(data.main);
      setWeatherId(data.weather[0].id);
      console.log(data);
    } else {
      alert("평균 날씨 데이터 가져오기 실패!");
    }
  };
  //   const getImgSrc = weahterId => {
  //     let iconId = weahterId === 800 ? 0 : (parseInt(weahterId) / 100).toFixed(0);
  //     switch (iconId) {
  //       case "0":
  //         return "https://openweathermap.org/img/wn/01d@2x.png";
  //         break;
  //       case "1":
  //         return "https://openweathermap.org/img/wn/02d@2x.png";
  //       case "2":
  //         return "https://openweathermap.org/img/wn/03d@2x.png";
  //       case "3":
  //         return "https://openweathermap.org/img/wn/04d@2x.png";
  //       case "5":
  //         return "https://openweathermap.org/img/wn/05d@2x.png";
  //       case "6":
  //         return "https://openweathermap.org/img/wn/06d@2x.png";
  //       case "7":
  //         return "https://openweathermap.org/img/wn/07d@2x.png";
  //       case "8":
  //         return "https://openweathermap.org/img/wn/08d@2x.png";
  //     }
  //   };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  const [user, setUser] = useRecoilState(userState);

  const { kakao } = window;
  const [data, setData] = useState(null);
  useEffect(() => {
    getGardenInfo(gardenToken).then(response => {
      let { code, message, data } = response.data;
      if (code === 200) {
        setData(data);

        data.gardens.map((item, idx) => {
          getAddress(item.location.y, item.location.x, item.garden_id);
        });
      }
    });
  }, []);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home", { replace: true });
    }
  }, []);

  const [loc, setLoc] = useState([]);
  const getAddress = useCallback((lat, lng, garden_id) => {
    const geocoder = new kakao.maps.services.Geocoder();

    const coord = new kakao.maps.LatLng(lat, lng);
    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        setLoc(loc => [
          ...loc,
          {
            location: result[0].address.address_name,
            garden_id: garden_id,
          },
        ]);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, []);

  const Box = (item, idx) => {
    return (
      <div
        className={"flexRow acenter"}
        style={{ marginBottom: "24px", justifyContent: "space-between" }}
      >
        <div className={"flexRow"}>
          <img
            src={"/img/mingcute_user-3-fill.png"}
            style={{ width: "32px", height: "32px" }}
          />
          <div className={"w12"} />
          <div className={"flexColumn start"}>
            <div className={"designText2"}>
              {loc.find(x => x.garden_id === item.garden_id)?.location}
            </div>
            <div className={"h4"} />
            <div className={"designText3"}>
              이용기간 : {item.garden_lease_term.start_date.split(" ")[0]} -{" "}
              {item.garden_lease_term.end_date.split(" ")[0]}
            </div>
            <div className={"h4"} />
            <div className={"designText3"}>
              상태 : {item.type === "admin" ? "관리자" : "구성원"}
            </div>
          </div>
        </div>
        <div>
          <img
            src={"/img/IconArrowRegularForward.png"}
            className={"pointer"}
            onClick={() => {
              navigate(`/home/garden?id=${item.garden_id}`);
            }}
          />
        </div>
      </div>
    );
  };
  const dummy = [
    {
      img: "",
      address: "광진구 군자로 2길 15 101호",
      time: "2023.04.12 - 2024.04.11",
      state: "관리자",
    },
    {
      img: "",
      address: "광진구 군자로 2길 15 101호",
      time: "2023.04.12 - 2024.04.11",
      state: "관리자",
    },
    {
      img: "",
      address: "광진구 군자로 2길 15 101호",
      time: "2023.04.12 - 2024.04.11",
      state: "구성원",
    },
  ];

  return (
    <div>
      <Header />
      {gardenToken === undefined || gardenToken === null ? (
        <div
          className={"flexColumn"}
          style={{ padding: "0px 20px", alignItems: "start" }}
        >
          <div className={"h20"} />
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src={"/images/1685463055694.png"}
              className={"wfull"}
              style={{ borderRadius: "8px" }}
            />
            <div
              className={"designText4"}
              style={{
                textAlign: "start",
                position: "absolute",
                bottom: "40px",
                left: "20px",
                color: "#ffffff",
              }}
            >
              양봉은 빅데이터 분석으로 선정한
              <br />
              최적의 공유 옥상 텃밭 부지를
              <br />
              합리적인 가격에 제공합니다.
              <br />
              누구나 도심에서 즐길 수 있는 스마트 옥상 텃밭
              <br />
              지금 바로 시작해 보세요!
            </div>
          </div>

          <div className={"h20"} />

          <div className={"h20"} />

          <a
            className="flexAlign"
            href={getAuthKakaoLoginUri()}
            style={{
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "4px",
              color: "#1A1A1C",
              backgroundColor: "#FDE500",
              width: "100%",
              height: "36px",
            }}
          >
            카카오로 시작하기
          </a>
        </div>
      ) : (
        <div
          className={"flexColumn"}
          style={{ padding: "0px 20px", alignItems: "start" }}
        >
          <div className={"h20"} />
          <div className={"designText1"} style={{ textAlign: "start" }}>
            {data?.nickname}님, 안녕하세요.
            <br />
            농사 지으러 가기 좋은 날씨네요!
          </div>
          <div className={"h12"} />
          <div className={"flexRow acenter"}>
            <img
              src={"/img/Group.png"}
              style={{ width: "24px", height: "24px" }}
            />
            <div className={"w4"} />
            <div
              style={{
                fontWeight: "700",
                fontSize: "22px",
                lineHeight: "150%",
                color: "#333333",
              }}
            >
              {Math.round(weather?.temp)}˚
            </div>
            <div
              style={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "150%",
                color: "#333333",
              }}
            >
              <span style={{ color: "#359EFF" }}>
                {Math.round(weather?.temp_min)}˚
              </span>{" "}
              <span style={{ color: "#939393" }}>/</span>{" "}
              <span style={{ color: "#FF3838" }}>
                {Math.round(weather?.temp_max)}˚
              </span>
            </div>
          </div>
          <div className={"h32"} />
          <div className={"designText4"}>내 텃밭</div>
          <div className={"h16"} />
          <div className={"flexColumn wfull"}>
            {data === null
              ? ""
              : data?.gardens.map((item, idx) => {
                  return Box(item, idx);
                })}
          </div>

          <div className={"h32"} />
          <div className={"designText4"}>추천 상품</div>
          <div className={"h16"} />
          {DummyItems()}
        </div>
      )}
    </div>
  );
};
export default Home;
