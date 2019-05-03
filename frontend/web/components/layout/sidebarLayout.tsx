import styled from "styled-components";
import Sidebar from "../global/sidebar";
import { sidebarLinkProps } from "../../shared/utils/role";

const PageMain = styled.main`
  flex-grow: 1;
`;

type IndexProps = {
  links: sidebarLinkProps[];
  children: any;
};

function Index({ children, links }: IndexProps) {
  return (
    <>
      <Sidebar links={links} active={"test"} />
      <PageMain>{children}</PageMain>
    </>
  );
}

export default Index;
