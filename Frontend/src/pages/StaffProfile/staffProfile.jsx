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

export const TabBox = styled.div`
  border-bottom: 0;
  margin-bottom: 10px;
  padding: 5px;

  .nav-tabs {
    border-bottom: 1px solid #dee2e6;

    .nav-link {
      margin-bottom: -1px;
      background: 0 0;
      color: #888;
      border: 1px solid transparent;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
    }

    .nav-item.show .nav-link,
    .nav-link.active {
      color: #495057;
      background-color: #fff;
      border-color: #dee2e6 #dee2e6 #fff;
    }

    &.nav-tabs-bottom > li {
      margin-bottom: -1px;

      & > a.active,
      & > a.active:hover,
      & > a.active:focus {
        border-bottom-width: 2px;
        border-color: transparent;
        border-bottom-color: #00c5fb;
        color: #00c5fb;
        background-color: transparent;
        transition: none 0s ease 0s;
      }
    }
  }
`;

export const TabContent = styled.div`
  padding-top: 20px;
`;
