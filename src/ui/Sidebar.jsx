import styled from "styled-components";
import MainNav from "./MainNav.jsx";
import Logo from "./Logo.jsx";
import Uploader from "../data/Uploader.jsx";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
`;
export default function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
}