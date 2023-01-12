import styled from "styled-components";

export const HeaderContainer = styled.div`
  background: linear-gradient(to right, #00c5fb 0%, #0253cc 100%);
  border-bottom: 1px solid transparent;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 20%);
  height: 60px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;

  .header-left {
    float: left;
    height: 60px;
    padding: 0 20px;
    position: relative;
    text-align: center;
    width: ${({ isOpen }) => (isOpen ? "230px" : "0")};
    z-index: 1;
    transition: all 0.2s ease-in-out;

    .logo {
      display: ${({ isOpen }) => (isOpen ? "inline-block" : "none")};
      line-height: 60px;
    }

    @media screen and (max-width: 767px) {
      width: ${({ isOpen }) => (!isOpen ? "230px" : "0")};

      .logo {
        display: ${({ isOpen }) => (!isOpen ? "inline-block" : "none")};
      }
    }
  }

  .toggle_btn {
    color: #fff;
    float: left;
    font-size: 35px;
    line-height: 55px;
    padding: 0 10px;
  }

  .page-title-box {
    border-radius: 0;
    float: left;
    height: 60px;
    margin-bottom: 0;
    padding: 17px 20px;

    h3 {
      color: #fff;
      font-size: 20px;
      font-weight: normal;
      margin: 0;
    }
  }
`;

export const UserMenu = styled.ul`
  float: right;
  margin: 0;
  position: relative;
  z-index: 99;

  .top-nav-search {
    form {
      margin-top: 10px;
      position: relative;
      width: 230px;
    }

    .form-control {
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 50px;
      color: #fff;
      height: 40px;
      padding: 10px 50px 10px 15px;
    }

    .btn {
      background-color: transparent;
      border-color: transparent;
      color: rgba(255, 255, 255, 0.7);
      min-height: 40px;
      padding: 7px 15px;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  &.nav > li > a {
    color: #fff;
    font-size: 15px;
    line-height: 60px;
    padding: 0 15px;
    height: 60px;

    i {
      font-size: 20px;
      line-height: 60px;
    }

    .badge {
      background-color: #7460ee;
      color: #fff;
      font-weight: 700;
      position: absolute;
      right: 15px;
      top: 11px;
    }
  }
`;

export const UserImg = styled.span`
  display: inline-block;
  position: relative;

  img {
    border-radius: 50%;
    width: 30px;
  }

  .status {
    border: 2px solid #fff;
    bottom: 12px;
    height: 10px;
    margin: 0;
    position: absolute;
    right: 0;
    width: 10px;
    
    &.online {
      background-color: #55ce63;
  }
`;

export const TopNavDropdownHeader = styled.div`
  border-bottom: 1px solid #eee;
  text-align: center;

  .notification-title {
    color: #333;
    display: block;
    float: left;
    font-size: 14px;
  }

  .clear-notification {
    color: #f83f37;
    float: right;
    font-size: 11px;
    text-transform: uppercase;
  }
`;

export const TopNavDropdownFooter = styled.div`
  border-top: 1px solid #eee;

  a {
    display: block;
    text-align: center;
    color: #333;
  }
`;

export const NotificationContent = styled.div`
  height: 290px;
  // width: 350px;
  overflow-y: auto;
  position: relative;

  .notification-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .notification-message {
      margin-top: 0;
      border-bottom: 1px solid #f5f5f5;

      a {
        display: block;
        padding: 12px;
        border-radius: 2px;
      }

      .notification-details {
        color: #989c9e;
        margin-bottom: 0;
      }

      .notification-title {
        color: #333;
      }

      .notification-time {
        margin: 0;

        span {
          font-size: 12px;
          line-height: 1.35;
          color: #bdbdbd;
        }
      }
    }
  }
`;

export const Media = styled.div`
  margin-top: 0;
  border-bottom: 1px solid #f5f5f5;
  display: flex;

  .avatar {
    margin: 0 10px 0 0;
    text-align: center;
    width: 38px;
    position: relative;
    white-space: nowrap;

    img {
      border-radius: 50%;
      display: block;
      overflow: hidden;
      width: 100%;
    }
  }
`;
