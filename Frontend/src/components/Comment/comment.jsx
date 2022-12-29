import styled from "styled-components";

export const ChatContent = styled.div`
  height: 500px;
  overflow: scroll;
`;

export const ChatBody = styled.div``;

export const ChatLeft = styled.div`
  background: #5a8dee !important;
  color: #fff;
  float: left !important;
`;

export const ChatRight = styled.div`
  background-color: #fafbfb !important;
  border-radius: 0.267rem !important;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3) !important;
  clear: both !important;
  color: #525361;
  float: right !important;
  margin: 0.2rem 0 1.8rem 0.2rem !important;
  max-width: calc(100% - 5rem) !important;
  padding: 0.75rem 1rem !important;
  position: relative !important;
  text-align: left !important;
  word-break: break-word !important;
`;

export const ChatMessage = styled.div`
  background-color: #fafbfb;
  border-radius: 0.267rem !important;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3) !important;
  clear: both !important;
  color: #525361;
  float: right;
  margin: 10px;
  padding: 0.75rem 1rem !important;
  position: relative !important;
  text-align: left !important;
  word-break: break-word !important;

  &.left {
    float: left;
    background-color: #5a8dee;
    color: #fff;
  }
`;
