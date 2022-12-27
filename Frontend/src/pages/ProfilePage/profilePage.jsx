import styled from "styled-components";

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

export const TabContent = styled.div``;
