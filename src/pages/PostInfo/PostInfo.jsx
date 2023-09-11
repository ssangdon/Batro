import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setReply, getReply } from "../../controller/api";

const PostInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [trigger, setTrigger] = useState(false);
  const [reply, setReplies] = useState(null);
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState({
    boardId: location.state?.boardId,
    nickname: location.state?.nickname,
    title: location.state?.title,
    totalReply: location.state?.reply,
    type: location.state?.type,
    time: location.state?.time,
    description: location.state?.des,
  });
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
          fontSize: "12px",
          color: "#939393",
          textAlign: "left",
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
          backgroundColor: "#E9F8ED",
          lineHeight: "36px",
          fontWeight: 600,
          fontSize: "14px",
          textAlign: "center",
          borderRadius: "20px",
          height: "36px",
          width: "77px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {str}
      </div>
    );
  };

  useEffect(() => {
    getReply(info.boardId).then(res => {
      let { code, data, message } = res.data;
      if (message === "OK") {
        setReplies(data);
      } else {
        alert("댓글을 불러오는데 실패했습니다.");
      }
    });
  }, [trigger]);

  return (
    <div style={{ textAlign: "left" }}>
      <div
        className={"flexRow wfull relative"}
        style={{ justifyContent: "center", padding: "20px" }}
      >
        <div className={"designText7"} style={{ marginBottom: "20px" }}></div>
        <img
          src={"/img/IconHeaderLeft.png"}
          className={"absolute pointer"}
          style={{ left: "0px" }}
          onClick={() => {
            navigate("/community");
          }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "19px" }}>{typeSelector(info.type)}</div>
        <div style={{ display: "block" }}>
          <div>{info.nickname}</div>
          <div>{getTimeDifference(info.time)}</div>
        </div>
      </div>
      <div>
        <div style={{ border: "1px solid #F5F5F5", margin: "16px 0" }}></div>
        <div
          style={{
            height: "150px",
            textAlign: "left",
            color: "#3D3D3D",
            padding: "0 20px",
          }}
        >
          {info.description}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <img
          style={{ marginRight: "8px" }}
          width={17}
          height={17}
          src="/img/comment.png"
        ></img>
        <div
          style={{
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "22px",
            color: "#6F6F6F",
          }}
        >
          {info.totalReply}
        </div>
      </div>
      <div style={{ border: "1px solid #F5F5F5", margin: "16px 0" }}></div>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ padding: "0px 20px", width: "100%" }}>
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
              value={search}
              placeholder="댓글을 입력해주세요."
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
            <img
              onClick={() => {
                if (search.length === 0) {
                  alert("댓글을 입력해주세요.");
                } else {
                  setReply(info.boardId, search).then(res => {
                    let { data, message } = res.data;
                    if (message === "OK") {
                      alert("댓글을 성공적으로 남겼습니다.");
                      setSearch("");
                      console.log(data);
                      setTrigger(!trigger);
                    } else {
                      alert("댓글 남기는데에 실패하였습니다.");
                    }
                  });
                }
              }}
              width={28}
              height={28}
              src="/img/sendIcon.png"
            />
          </div>
        </div>
      </div>
      <div style={{ border: "1px solid #F5F5F5", margin: "16px 0" }}></div>
      {reply?.length === 0 ? (
        <div style={{ padding: "0 20px" }}>아직 댓글이 존재하지 않습니다.</div>
      ) : (
        reply &&
        reply.map((d, i) => (
          <div key={i} style={{ marginBottom: "20px", padding: "0 20px" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#555555",
                  lineHeight: "22px",
                  marginRight: "4px",
                }}
              >
                {d.writer}
              </div>
              <div style={{ lineHeight: "24px" }}>
                {getTimeDifference(d.register_date)}
              </div>
            </div>
            <div
              style={{ fontWeight: 500, fontSize: "14px", color: "#3D3D3D" }}
            >
              {d.description}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default PostInfo;
