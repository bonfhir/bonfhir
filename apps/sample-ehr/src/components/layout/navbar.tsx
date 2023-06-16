import {
  Center,
  Code,
  Group,
  Navbar as MantineNavbar,
  NavLink,
  Stack,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBuildingFactory2,
  IconFlame,
  IconHome,
  IconLogout2,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { link: "/", label: "Dashboard", icon: <IconHome /> },
  { link: "/patients", label: "Patients", icon: <IconUsers /> },
  {
    link: "/organizations",
    label: "Organizations",
    icon: <IconBuildingFactory2 />,
  },
];

export function Navbar() {
  const router = useRouter();
  return (
    <MantineNavbar height="100vh" width={{ sm: 210 }}>
      <MantineNavbar.Section m="sm" mt="md">
        <Stack>
          <Group spacing="xs">
            <ThemeIcon radius="xl" size="lg" color="red">
              <IconFlame />
            </ThemeIcon>
            <Title order={3}>Sample EHR</Title>
          </Group>
        </Stack>
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mt="md">
        <Stack spacing={0}>
          {links.map((link) => (
            <NavLink
              key={link.label}
              component={Link}
              href={link.link}
              icon={link.icon}
              label={link.label}
              active={
                link.link === "/"
                  ? router.pathname === link.link
                  : router.pathname.startsWith(link.link)
              }
            />
          ))}
        </Stack>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <Stack>
          <NavLink
            component={Link}
            href="/logout"
            icon={<IconLogout2 />}
            label="Log out"
          />
          <Code block color="blue">
            <Center>version: {process.env.PACKAGE_VERSION || "local"}</Center>
          </Code>
        </Stack>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
