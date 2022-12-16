import styled from "styled-components";

export const AccountContent = styled.div`
  padding: 20px 0;
`;

export const AccountLogo = styled.div`
  margin-bottom: 30px;
  text-align: center;

  .brand-logo {
    width: 350px;
  }
`;

export const AccountBox = styled.div`
  background-color: #fff;
  border: 1px solid #ededed;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 20%);
  margin: 0 auto;
  overflow: hidden;
  width: 480px;

  .form-group {
    margin-bottom: 25px;
  }

  label {
    color: #1f1f1f;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 5px;
  }

  .form-control {
    background-color: #fbfbfb;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    height: 46px;
  }

  small {
    width: 100%;
    margin-top: 0.25rem !important;
    font-size: unset !important;
    color: #f62d51 !important;
    display: inline-block !important;
  }

  .pass-group {
    position: relative !important;

    .eye-slash {
      position: absolute !important;
      right: 17px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      color: #757575 !important;
      cursor: pointer !important;
    }
  }

  .account-btn {
    background: #00c5fb;
    background: -moz-linear-gradient(left, #00c5fb 0%, #0253cc 100%);
    background: -webkit-linear-gradient(left, #00c5fb 0%, #0253cc 100%);
    background: -ms-linear-gradient(left, #00c5fb 0%, #0253cc 100%);
    background: linear-gradient(to right, #00c5fb 0%, #0253cc 100%);
    border: 0;
    border-radius: 4px;
    display: block;
    font-size: 22px;
    padding: 10px 26px;
    width: 100%;
  }
`;

export const AccountWrapper = styled.div`
  padding: 30px;

  .account-title {
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 5px;
    text-align: center;
  }

  .account-subtitle {
    color: #4c4c4c;
    font-size: 18px;
    margin-bottom: 30px;
    text-align: center;
  }
`;

export const AccountFooter = styled.div`
  text-align: center;

  p {
    margin-bottom: 0;
  }

  a {
    color: #00c5fb;
  }
`;
