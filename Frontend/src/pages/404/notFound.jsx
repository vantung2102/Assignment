import styled from "styled-components";

export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  width: 100%;

  .btn-custom {
    border-radius: 50px;
    font-size: 18px;
    font-weight: 600;
    min-width: 200px;
    padding: 10px 20px;
    background: linear-gradient(to right, #00c5fb 0%, #0253cc 100%);
    color: #fff;
  }
`;

export const Title = styled.h1`
  color: #00c5fb;
  font-size: 10em;
`;
