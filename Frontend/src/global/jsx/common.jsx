import styled from "styled-components";

export const MainWrapper = styled.div``;

export const PageWrapper = styled.div`
  left: 0;
  margin-left: 230px;
  padding-top: 60px;
  position: relative;
  transition: all 0.2s ease-in-out;
  min-height: 528px;

  & > .content {
    padding: 30px;
  }
`;

export const ViewIcons = styled.div`
  float: right;
  margin-right: 10px;

  .btn {
    background-color: #fff;
    border: 1px solid #e3e3e3;
    color: #888;
    font-size: 18px;
    margin-right: 5px;
    min-width: 40px;
    padding: 4px;

    &.active {
      color: #333;
    }
  }
`;
