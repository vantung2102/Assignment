import styled from "styled-components";

export const TreeNode = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  margin: 0 0 20px 0;
  padding: 3px;
  border: 2px dashed transparent;
  text-align: center;
  transition: transform 0.3s, opacity 0.3s;
`;

export const NodeTitle = styled.div`
  padding: 2px;
  width: 120px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: bold;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: rgba(217, 83, 79, 0.8);
  color: #fff;
  border-radius: 4px 4px 0 0;
`;

export const NodeContent = styled.div`
  padding: 2px;
  height: 20px;
  font-size: 0.625rem;
  border: 1px solid rgba(217, 83, 79, 0.8);
  border-radius: 0 0 4px 4px;
  text-align: center;
  background-color: #fff;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
