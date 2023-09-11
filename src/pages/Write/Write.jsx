import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setBoard } from "../../controller/api";

const Write = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState(0);

  const handleChange = event => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  return (
    <div>
      <Header />

      <div
        className={"flexColumn"}
        style={{
          padding: "0px 20px",
          alignItems: "start",
          position: "relative",
        }}
      >
        <div className={"h20"} />
        <div
          className={"flexRow wfull relative"}
          style={{ justifyContent: "end" }}
        >
          <div
            className={"designText7"}
            onClick={() => {
              if (title?.length === 0 || content?.length === 0) {
                alert("내용/제목을 입력해주세요.");
              } else {
                setBoard(title, content, category).then(res => {
                  let { code, message, data } = res.data;
                  if (code === 200) {
                    alert("게시글 작성에 성공하였습니다.");
                    navigate("/community");
                  } else {
                    alert("게시글 작성하는데 오류가 생겼습니다.");
                  }
                });
              }
            }}
          >
            등록
          </div>
          <img
            src={"/img/IconHeaderLeft.png"}
            className={"absolute pointer"}
            style={{ left: "0px" }}
            onClick={() => {
              navigate("/community");
            }}
          />
        </div>
        <div className={"h20"} />
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              width: "30%",
              fontWeight: 600,
              fontSize: "14px",
              color: "#1A1A1A",
              lineHeight: "48px",
            }}
          >
            카테고리 선택
          </div>
          <div style={{ width: "70%" }}>
            <select
              name="selectCategory"
              style={{
                width: "90%",
                height: 48,
                fontSize: 14,
                fontWeight: 600,
                marginRight: 6,
                backgroundColor: "#F9F9F9",
                border: "none",
                borderRadius: "12px",
              }}
              onChange={handleChange}
            >
              <option value={0}>전체</option>
              <option value={1}>번개모임</option>
              <option value={2}>지식나누미</option>
              <option value={3}>같이농사</option>
            </select>
          </div>
        </div>

        <input
          className={"designText2"}
          style={{
            borderBottom: "1px solid #EFEFEF",
            width: "100%",
            padding: "20px",
          }}
          placeholder={"제목을 입력하세요"}
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />

        <div className={"h20"} />
        <textarea
          className={"designText2"}
          style={{
            border: "1px solid #EFEFEF",
            width: "100%",
            resize: "none",
            padding: "20px",
            height: "60vh",
          }}
          placeholder={"내용을 입력하세요"}
          value={content}
          onChange={event => {
            setContent(event.target.value);
          }}
        />
      </div>
    </div>
  );
};
export default Write;
