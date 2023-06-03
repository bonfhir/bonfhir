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
  IconFlame,
  IconHome,
  IconLogout2,
  IconThumbUp,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { link: "/", label: "Dashboard", icon: <IconHome /> },
  { link: "/patients", label: "Patients", icon: <IconUsers /> },
  { link: "/performance", label: "Performance", icon: <IconThumbUp /> },
];

export function Navbar() {
  const router = useRouter();
  return (
    <MantineNavbar height="100vh" width={{ sm: 210 }}>
      <MantineNavbar.Section m="sm">
        <Stack>
          <Group spacing="xs">
            <ThemeIcon radius="xl" size="lg" color="red">
              <IconFlame />
            </ThemeIcon>
            <Title order={3}>Sample EHR</Title>
          </Group>
        </Stack>
      </MantineNavbar.Section>
      <MantineNavbar.Section grow>
        <Stack spacing="xs">
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
