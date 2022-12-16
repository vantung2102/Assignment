import styled from "styled-components";

export const PageTitle = styled.h3`
  color: #1f1f1f;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 5px;
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
