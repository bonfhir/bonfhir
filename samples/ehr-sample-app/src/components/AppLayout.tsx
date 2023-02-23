import { Layout, Menu } from "antd";
import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export type AppLayoutProps = PropsWithChildren;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  width: 100vw;
`;

export function AppLayout({ children }: AppLayoutProps): ReactNode {
  return (
    <StyledLayout>
      <Layout.Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="patients">
            <NavLink to="/patients">Patients</NavLink>
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </StyledLayout>
  );
}
