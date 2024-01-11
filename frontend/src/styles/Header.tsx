import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;

  border-radius: 0 0 1rem 1rem;
  background-color: rgba(var(--blue-color-1), 0.50);

  & nav {
    display: flex;
    gap: 0.75rem;
  }
`

export default StyledHeader