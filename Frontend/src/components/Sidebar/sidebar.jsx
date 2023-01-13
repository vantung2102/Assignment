import styled from "styled-components";

export const SidebarContainer = styled.div`
  background-color: #34444c;
  border-right: 1px solid transparent;
  bottom: 0;
  left: 0;
  margin-top: 0;
  position: fixed;
  top: 60px;
  transition: all 0.2s ease-in-out 0s;
  width: ${({ isOpen }) => (isOpen ? "230px" : "0")};
  z-index: 999;

  @media screen and (max-width: 767px) {
    width: ${({ isOpen }) => (!isOpen ? "230px" : "0")};
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }

  @media screen and (min-width: 1024px) and (max-width: 1439px) {
  }
`;

export const SidebarInner = styled.div`
  height: 100%;
  transition: all 0.2s ease-in-out 0s;
`;

export const SidebarMenu = styled.div`
  padding: 10px 0;

  ul {
    font-size: 15px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: relative;

    & > li {
      position: relative;

      & > a {
        padding: 8px 15px;
        align-items: center;
        color: #b7c0cd;
        font-size: 15px;
        display: flex;
        justify-content: flex-start;
        position: relative;
        transition: all 0.2s ease-in-out 0s;

        span {
          transition: all 0.2s ease-in-out 0s;
          display: inline-block;
          margin-left: 15px;
          white-space: nowrap;
        }
      }
    }
  }

  .menu-arrow {
    transition: transform 0.15s;
    position: absolute;
    right: 15px;
    display: inline-block;
    text-rendering: auto;
    line-height: 40px;
    font-size: 18px;
    transform: translate(0, 0);
    line-height: 18px;
    top: 11px;
  }
`;
