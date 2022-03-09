import React from "react";
import styled from "styled-components";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";

const Detailbody = styled.div`
  border: 1px solid grey;
  /* padding: 200px; */
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1080px;
  max-height: 1980px;

  > div {
    border: 1px solid red;
    padding: 10px;
    display: flex;

    > div {
      border: 1px solid red;
      padding: 10px;
    }
  }
  > #up {
    flex: 1 0 auto;
    > #postImg {
      flex: 1 0 auto;
    }
    > #postInfo {
      flex: 2 0 auto;

      > div {
        margin: 10px;
        > button {
          margin-left: 1rem;
          width: 70px;
          height: 25px;
          border: 1px solid grey;
          cursor: pointer;
          color: rgba(30, 22, 54, 0.6);
          font-size: 14px;
          border-radius: 30px;
        }
        > button:hover {
          color: rgba(255, 255, 255, 0.85);
          box-shadow: rgba(30, 22, 54, 0.7) 0 80px 0px 2px inset;
        }
        > h4 {
          color: #a14efc;
        }
      }
    }
  }
  > #down {
    display: flex;
    flex: 3 0 auto;
    flex-direction: column;
    > text {
      margin-left: 9px;
    }
    > #postIntro {
      display: flex;
      flex: 1 0 auto;
      > textarea {
        width: 100vw;
      }
      > div {
      }
    }
    > #musicList {
      flex: 4 0 auto;
      > #music {
        border: 1px solid red;
        padding: 10px;
        display: flex;
      }
    }
  }
`;
const Header = styled.div`
  /* border: 1px solid red; */
  /* padding: 10px; */

  display: flex;
  margin-bottom: 2rem;
  left: 0px;
  top: 0;
  border-bottom: 1px solid #d1d4d9;
  position: sticky;
  background-color: rgba(255, 255, 255, 0.96);
  > div {
    /* border: 1px solid red; */
    /* padding: 10px; */
    flex: 1 0 auto;
  }
`;
const Menu = styled.div`
  /* border: 1px solid red; */
  /* padding: 10px; */

  display: flex;
  flex: 4 0 auto;
`;
const Nick = styled.div`
  /* //border: 1px solid red; */
  /* padding: 10px; */
  text-align: center;
  margin-top: 20px;
  flex: 3 0 auto;
  > span {
    color: #a14efc;
  }
`;
const MenuButton = styled.div`
  // border: 1px solid red;
  /* padding: 10px; */
  margin-top: 10px;
  display: flex;
  width: 220px;
  > button {
    //border: 1px solid red;
    /* padding: 10px; */
    border: 0;
    background-color: white;
    cursor: pointer;
    margin: 10px;
    margin-top: 0px;
    height: 40px;
    font-size: 16px;
  }
  > button:hover {
    color: #a14efc;
  }
`;

export default function Detail({
  detailData,
  handleMainPage,
  users,
  handleLogout,
  setIsRemake,
  handleMusicData,
}) {
  const history = useHistory();

  console.log("디테일 컴포넌트 정보: ", detailData);
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/post/${detailData.id}`)
      .then(() => handleMainPage());
  };
  const handleEdit = () => {
    setIsRemake(true);
    handleMusicData();
    history.push("/editor");
  };
  return (
    <div id="detailPage">
      <Header>
        <Link to="/" className="nav-logo">
          <img src={require("../images/logo.png")} width="220px" alt="logo" />
        </Link>
        <Menu>
          <Nick>
            <span>{users.nickname}</span>님 안녕하세요.
          </Nick>
          <MenuButton>
            <button onClick={handleMainPage}>메인페이지</button>
            <button onClick={handleLogout}>로그아웃</button>
          </MenuButton>
        </Menu>
      </Header>
      <Detailbody>
        <div id="up">
          <div id="postInfo">
            <div>
              <h1>{detailData.postTitle}</h1>
            </div>
            <div>
              <h4>{detailData.User.nickname}</h4>
            </div>
            {detailData.User.nickname === users.nickname ? (
              <div>
                <button onClick={handleEdit}>수정하기</button>
                <button onClick={handleDelete}>삭제하기</button>
              </div>
            ) : (
              <div></div>
            )}

            <div>
              {/* <text>
                테그 :
                {detailData.tags.map((e) => {
                  return <span>{e}, </span>;
                })}
              </text> */}
            </div>
          </div>
          <div id="postImg">
            <img src={detailData.image} width="200vw" />
          </div>
        </div>
        <div id="down">
          <text>소개글</text>
          <div id="postIntro">
            <text>{detailData.postExplain}</text>
          </div>
          <div id="musicList">
            음악 리스트
            {detailData.MusicData.map((e) => {
              return (
                <div id="music">
                  <div>
                    <img src={e.musicImage} alt="1" width="100vw"></img>
                  </div>
                  <div>
                    <div>
                      <text>노래이름 : {e.musicTitle}</text>
                    </div>
                    <div>
                      <text>아티스트 : {e.artist}</text>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Detailbody>
    </div>
  );
}
