import Header from "../../components/header/Header";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBoard } from "../../controller/api";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const Community = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [posts, setPosts] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const handleChange = (event, value) => {
    setPageNum(value - 1);
  };
  useEffect(() => {
    getBoard(pageNum, category, search).then(res => {
      let { code, data, message } = res.data;
      if (message === "OK") {
        setTotalCount(data.totalCount);
        setPosts(data.boards);
        // console.log(posts);
      } else {
        alert("게시글 데이터를 불어오지 못했습니다.");
      }
    });
  }, [category, pageNum]);

  useEffect(() => {
    setPageCount(Math.ceil(totalCount / 20));
  }, [totalCount]);

  const handleInputFocus = () => {
    document.querySelector("#inputSearch").focus();
  };

  const getTimeDifference = time => {
    let writeTime = new Date(time);
    let date = new Date();
    let dif = date.getTime() - writeTime.getTime();
    let str = "";
    let difMin = Math.floor(dif / (1000 * 60));
    let difHour = Math.floor(dif / (1000 * 60 * 60));
    let difDay = Math.floor(dif / (1000 * 60 * 60 * 24));
    let difMonth = Math.floor(dif / (1000 * 60 * 60 * 24 * 30));
    if (difMin === 0) {
      str = "지금";
    } else {
      if (difMin > 0 && difHour === 0) {
        str = `${difMin}분전`;
      } else if (difHour > 0 && difDay === 0) {
        str = `${difHour}시간전`;
      } else if (difDay > 0 && difMonth === 0) {
        str = `${difDay}일전`;
      } else {
        str = `${difMonth}달전`;
      }
    }
    return (
      <div
        style={{
          fontSize: "14px",
          color: "#939393",
          textAlign: "right",
          fontWeight: 500,
        }}
      >
        {str}
      </div>
    );
  };

  const typeSelector = type => {
    let str = "";
    switch (type) {
      case 0:
        str = "전체";
        break;
      case 1:
        str = "번개모임";
        break;
      case 2:
        str = "지식나누미";
        break;
      case 3:
        str = "같이농사";
        break;
      default:
        str = "전체";
        break;
    }
    return (
      <div
        style={{
          color: "#39BA5D",
          fontWeight: 700,
          fontSize: "12px",
          lineHeight: "18px",
        }}
      >
        {str}
      </div>
    );
  };
  return (
    <div>
      <Header />
      <div style={{ padding: "5%" }}>
        <div
          className={"flexRow wfull relative"}
          style={{ justifyContent: "center" }}
        >
          <div className={"designText7"} style={{ marginBottom: "20px" }}>
            커뮤니티
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <div style={{ padding: "0px 20px", marginBottom: 20, width: "100%" }}>
            <div
              onClick={() => {
                handleInputFocus();
              }}
              style={{
                border: "1px solid #F9F9F9",
                borderRadius: 12,
                height: 48,
                padding: "0px 14px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F9F9F9",
              }}
            >
              <input
                id="inputSearch"
                type="text"
                style={{
                  width: "100%",
                  height: 22,
                  fontSize: 14,
                  fontWeight: 600,
                  marginRight: 6,
                  backgroundColor: "#F9F9F9",
                }}
                placeholder="검색어를 입력하세요."
                onChange={e => {
                  setSearch(e.target.value);
                }}
              />
              <img
                onClick={() => {
                  getBoard(pageNum, category, search).then(res => {
                    let { code, data, message } = res.data;
                    if (message === "OK") {
                      setTotalCount(data.totalCount);
                      setPosts(data.boards);
                    } else {
                      alert("검색에 실패하였습니다.");
                    }
                  });
                }}
                width={19}
                height={19}
                src="/img/searchIcon.png"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          <div
            style={{
              width: "23%",
              color: category === 0 ? "#39BA5D" : "#6F6F6F",
              backgroundColor: category === 0 ? "#E9F8ED" : null,
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setPageNum(0);
              setCategory(0);
            }}
          >
            전체
          </div>
          <div
            style={{
              width: "23%",
              color: category === 1 ? "#39BA5D" : "#6F6F6F",
              backgroundColor: category === 1 ? "#E9F8ED" : null,
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setPageNum(0);
              setCategory(1);
            }}
          >
            번개모임
          </div>
          <div
            style={{
              width: "23%",
              color: category === 2 ? "#39BA5D" : "#6F6F6F",
              backgroundColor: category === 2 ? "#E9F8ED" : null,
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setPageNum(0);
              setCategory(2);
            }}
          >
            지식나누미
          </div>
          <div
            style={{
              width: "23%",
              color: category === 3 ? "#39BA5D" : "#6F6F6F",
              backgroundColor: category === 3 ? "#E9F8ED" : null,
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setPageNum(0);
              setCategory(3);
            }}
          >
            같이농사
          </div>
        </div>
        <img
          src={"/img/Rectangle 3771.png"}
          style={{
            position: "absolute",
            bottom: "40px",
            right: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/write");
          }}
        />
        <div style={{ marginTop: "20px" }}>
          {posts?.length === 0 ? (
            <div>게시글이 존재하지않습니다.</div>
          ) : (
            posts &&
            posts.map((data, idx) => (
              <div
                key={idx}
                onClick={() => {
                  navigate("/postinfo", {
                    state: {
                      nickname: data.nickname,
                      boardId: data.id,
                      time: data.register_date,
                      title: data.title,
                      reply: data.totalReply,
                      type: data.type,
                      des: data.description,
                    },
                  });
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "88%",
                    marginBottom: "3px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#939393",

                      display: "flex",
                    }}
                  >
                    <div style={{ marginRight: "6px" }}>
                      {typeSelector(data.type)}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#939393",
                        lineHeight: "18px",
                      }}
                    >
                      {data.nickname}
                    </div>
                  </div>
                  <div>{getTimeDifference(data.register_date)}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#3D3D3D",
                    fontWeight: 600,
                    fontSize: "15px",
                    marginBottom: "4px",
                  }}
                >
                  {data.title}
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "8px" }}>
                    <img src="/img/comment.png" width={17} height={17}></img>
                  </div>
                  <div
                    style={{
                      color: "#6F6F6F",
                      fontWeight: 600,
                      fontSize: "15px",
                    }}
                  >
                    {data.totalReply}
                  </div>
                </div>
                <div
                  style={{ border: "1px solid #F5F5F5", marginBottom: "12px" }}
                ></div>
              </div>
            ))
          )}
        </div>
      </div>
      <footer>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Pagination
            page={pageNum + 1}
            onChange={handleChange}
            count={pageCount}
            shape="rounded"
          />
        </Stack>
      </footer>
    </div>
  );
};
export default Community;
