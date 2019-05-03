import styled from "styled-components";
import role from "../shared/utils/role";
import { WithAuth } from "../shared/utils/auth";
import { sidebarLinkProps } from "../shared/utils/role";
import SidebarLayout from "../components/layout/sidebarLayout";
const IndexWrapper = styled.h1``;

type IndexProps = {
  links: sidebarLinkProps[];
};

function Index({ links }: IndexProps) {
  return (
    <WithAuth>
      <SidebarLayout links={links}>
        <IndexWrapper>Welcome</IndexWrapper>
      </SidebarLayout>
    </WithAuth>
  );
}

Index.getInitialProps = () => {
  const links = role.getSidebarLinksByRole();
  return { links };
};

export default Index;
