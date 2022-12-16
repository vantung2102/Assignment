import styled from "styled-components";

export const ProfileView = styled.div`
  position: relative;

  .ProfileImgWrap {
    height: 120px;
    width: 120px;

    img {
      border-radius: 50%;
      height: 120px;
      width: 120px;
    }
  }

  .ProfileImg {
    width: 120px;
    height: 120px;
  }

  .profile-basic {
    margin-left: 140px;
    padding-right: 50px;
  }

  .profile-info-left {
    border-right: 2px dashed #ccc;
  }

  .user-name {
    color: #333;
  }

  .staff-id {
    font-size: 14px;
    // font-weight: 500;
    margin-top: 5px;
  }

  .btn-custom {
    background: #00c5fb;
    background: linear-gradient(to right, #00c5fb 0%, #0253cc 100%);
    color: #fff;
    border: 0;
  }

  .btn-active {
    background-color: #c2eeba;
    padding: 5px 30px;
    color: #fff;
  }

  .personal-info {
    list-style: none;
    margin-bottom: 0;
    padding: 0;

    li {
      margin-bottom: 10px;

      .title {
        color: #4f4f4f;
        float: left;
        font-weight: 500;
        margin-right: 30px;
        width: 25%;
      }

      .personal-info li .text {
        color: #8e8e8e;
        display: block;
        overflow: hidden;
      }

      .btn-in-active {
        background-color: #ffa9a9;
      }
    }
  }
`;
