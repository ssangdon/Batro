import Header from "../../components/header/Header";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { getGarden } from "../../../src/controller/api";
import ClipLoader from "react-spinners/ClipLoader";
import AutoComma from "../../modules/AutoComma";

// const positions = [
//   {
//     title: "테스트1",
//     latlng: { lat: 37.5436025, lng: 127.0774438 },
//     price: 140000,
//     maxParty: 15,
//     currentParty: 10,
//     imgSrc: "../../../public/img/img2.jpg",
//   },
//   {
//     title: "테스트2",
//     latlng: { lat: 37.5435608, lng: 127.0774101 },
//     price: 170000,
//     maxParty: 15,
//     currentParty: 10,
//     imgSrc: "../../../public/img/img2.jpg",
//   },
//   {
//     title: "테스트3",
//     latlng: { lat: 37.5435698, lng: 127.0774131 },
//     price: 140000,
//     maxParty: 15,
//     currentParty: 10,
//     imgSrc: "../../../public/img/img3.jpg",
//   },
//   {
//     title: "테스트4",
//     latlng: { lat: 33.451393, lng: 126.570738 },
//     price: 140000,
//     maxParty: 15,
//     currentParty: 10,
//     imgSrc: "../../../public/img/img2.jpg",
//   },
//   {
//     title: "테스트5",
//     latlng: { lat: 37.498407, lng: 127.1454097 },
//     price: 140000,
//     maxParty: 15,
//     currentParty: 10,
//     imgSrc: "../../../public/img/img3.jpg",
//   },
//   {
//     title: "테스트6",
//     latlng: { lat: 37.500407, lng: 127.1453497 },
//     price: 60000,
//     maxParty: 4,
//     currentParty: 0,
//     imgSrc: "../../../public/img/img2.jpg",
//   },
//   {
//     title: "테스트7",
//     latlng: { lat: 37.494407, lng: 127.1453297 },
//     price: 80000,
//     maxParty: 10,
//     currentParty: 7,
//     imgSrc: "../../../public/img/img3.jpg",
//   },
//   {
//     title: "테스트8",
//     latlng: { lat: 37.499907, lng: 127.1453447 },
//     price: 70000,
//     maxParty: 9,
//     currentParty: 1,
//     imgsrc: "../../../public/img/img2.jpg",
//   },
//   {
//     title: "테스트9",
//     latlng: { lat: 37.499207, lng: 127.1453537 },
//     price: 320000,
//     maxParty: 12,
//     currentParty: 4,
//     imgSrc: "../../../public/img/img2.jpg",
//   },
// ];

const Find = () => {
  const { kakao } = window;
  const [location, setLocation] = useState(null);
  const [isDrawerInfoOpened, setIsDrawerInfoOpened] = useState(false);
  const [address, setAddress] = useState(null);
  const [positionss, setPositionss] = useState([]);

  const [y, setY] = useState(0);
  const navigate = useNavigate();
  const windowHeight = useRef(window.innerHeight);
  const [height, setHeight] = useState(windowHeight.current);
  const [information, setInformation] = useState({
    price: null,
    maxParty: null,
    currentParty: null,
    imgSrc: null,
    lat: null,
    lng: null,
    garden_id: null,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);
  useEffect(() => {
    setHeight(windowHeight.current);
  }, [windowHeight]);
  const successHandler = response => {
    const lat = response.coords.latitude;
    const lng = response.coords.longitude;
    getGarden(lat, lng, 700).then(res => {
      let { code, message, data } = res.data;
      if (code === 200) {
        setPositionss(data);
        console.log(positionss);
      } else {
        console.log(res.data);
        alert("지도정보 가져오기 실패");
      }
    });

    setLocation({ lat, lng });
  };

  const errorHandler = error => {
    console.log("현재위치를 불러오지 못했습니다. 다시 시도해주세요.");
  };
  const getAddress = useCallback((lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder();

    const coord = new kakao.maps.LatLng(lat, lng);
    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, []);
  const EventMarkerContainer = ({
    position,
    data,
    garden_id,
    valid,
    garden_iamge,
  }) => {
    const map = useMap();
    let posi = { lat: position.y, lng: position.x };
    let imgsrc = "";
    if (!valid) {
      imgsrc = "/img/Vectorping.png";
    } else {
      imgsrc = "/img/avaliablePing.png";
    }
    return (
      <MapMarker
        position={posi} // 마커를 표시할 위치
        // @ts-ignore
        onClick={marker => {
          let result = marker.getPosition();
          map.panTo(result);
          getAddress(posi.lat, posi.lng);
          setInformation({
            // price: data.price,
            // maxParty: data.maxParty,
            // currentParty: data.currentParty,
            // imgSrc: data.imgSrc,
            price: 140000,
            maxParty: 15,
            currentParty: data.length,
            imgSrc: garden_iamge,
            lat: posi.lat,
            lng: posi.lng,
            garden_id: garden_id,
          });
          setY(windowHeight.current - 900);
          setIsDrawerInfoOpened(true);
        }}
        image={{
          src: `${imgsrc}`, // 마커이미지의 주소입니다
          size: {
            width: 24,
            height: 35,
          }, // 마커이미지의 크기입니다
        }}
        title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      />
    );
  };

  return (
    <div style={{ position: "relative", height: "calc(100vh - 50px)" }}>
      <Header title="주변 텃밭" />
      {location === null ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            height: "100%",
          }}
        >
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <Map // 지도를 표시할 Container
          center={{ lat: location.lat, lng: location.lng }}
          style={{
            // 지도의 크기
            width: "100%",
            height: `100%`,
            zIndex: 0,
            position: "relative",
          }}
          level={3} // 지도의 확대 레벨
          onClick={() => {
            setIsDrawerInfoOpened(false);
            setY(windowHeight.current);
          }}
          onTileLoaded={map => {
            let lat = map.getCenter().getLat();
            let lng = map.getCenter().getLng();
            let level = map.getLevel();
            console.log(level);
            let meter = 0;
            switch (level) {
              case 1:
                meter = 150;
                break;
              case 2:
                meter = 300;
                break;
              case 3:
                meter = 700;
                break;
              case 4:
                meter = 2800;
                break;
              case 5:
                meter = 3500;
                break;
              case 6:
                meter = 4000;
                break;
              case 7:
                meter = 6000;
                break;
              default:
                meter = 0;
                break;
            }
            getGarden(lat, lng, meter).then(res => {
              let { code, message, data } = res.data;
              if (code === 200) {
                console.log(data);
                setPositionss(data);
              } else {
                alert("지도정보 가져오기 실패");
              }
            });
          }}
          //   onCenterChanged={map => {
          //     console.log(map);
          //     setState({
          //       level: map.getLevel(),
          //       center: {
          //         lat: map.getCenter().getLat(),
          //         lng: map.getCenter().getLng(),
          //       },
          //     });
          //   }}
        >
          {/* <MapMarker position={{ lat: location.lat, lng: location.lng }}>
            <div
              style={{
                color: "#000",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              여기에 계신가용가리?
            </div>
          </MapMarker> */}
          {positionss.map((data, index) => (
            <EventMarkerContainer
              key={data.garden.garden_id}
              garden_id={data.garden.garden_id}
              position={data.garden.location} // 마커를 표시할 위치
              data={data.members}
              valid={data.garden.is_valid}
              garden_iamge={data.garden.garden_iamge}
              //   weigth = {data.garden.weigth}
            />
          ))}
          <AnimatePresence>
            {isDrawerInfoOpened && (
              <motion.div
                className="box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: 100 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  zIndex: "1",
                  // bottom: height > 844 ? "26px" : " 93px",
                  bottom: 10 + 100,
                  backgroundColor: "#DFDFDF",
                  width: "calc(100% - 40px)",
                  borderRadius: "30px",
                  left: "20px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                }}
                onClick={() =>
                  navigate("/find/gardenDetail", {
                    state: {
                      price: information.price,
                      currentParty: information.currentParty,
                      maxParty: information.maxParty,
                      imgSrc: information.imgSrc,
                      address: address,
                      lat: information.lat,
                      lng: information.lng,
                      garden_id: information.garden_id,
                    },
                  })
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    textAlign: "center",
                    minHeight: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                      minHeight: "100%",
                      padding: "1%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 1,
                      padding: 10,
                    }}
                  >
                    <img
                      className="img"
                      alt="1"
                      src={`${information.imgSrc}`}
                      style={{
                        borderRadius: 16,
                        objectFit: "fill",
                        minHeight: 70,
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: "70%",
                      padding: "8px",
                      paddingLeft: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                    className="pointer"
                  >
                    <div
                      style={{
                        textAlign: "left",
                        width: "100%",
                        color: "#3D3D3D",
                        fontWeight: 900,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {address} 옥상 텃밭
                    </div>
                    <div style={{ color: "#6F6F6F" }}>
                      분양가격 : {AutoComma(information.price)} 원 / 1달
                    </div>
                    <div style={{ color: "#6F6F6F" }}>
                      배정밭 : ({information.currentParty} /{" "}
                      {information.maxParty}) 명
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Map>
      )}
    </div>
  );
};
export default Find;
