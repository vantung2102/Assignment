import styled from "styled-components";

export const PaginationContainer = styled.ul`
  li a {
    color: #00c5fb;
  }
`;

export const PaginationItem = styled.li`
  &:first-child {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  &.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
    border-color: #dee2e6;
  }
`;
