import {
  Center,
  Code,
  Group,
  AppShell as MantineAppShell,
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
    <MantineAppShell
      //TODO: see what is equivalent in Mantine v7 to sm: 210
      style={{ height: "100vh", width: "sm" }}
      // height="100vh"
      // width={{ sm: 210 }}
    >
      <MantineAppShell.Section m="sm" mt="md">
        <Stack>
          <Group justify="xs">
            <ThemeIcon radius="xl" size="lg" color="red">
              <IconFlame />
            </ThemeIcon>
            <Title order={3}>Sample EHR</Title>
          </Group>
        </Stack>
      </MantineAppShell.Section>
      <MantineAppShell.Section grow mt="md">
        <Stack gap={0}>
          {links.map((link) => (
            <NavLink
              key={link.label}
              component={Link}
              href={link.link}
              //TODO:
              // icon={link.icon}

              label={link.label}
              active={
                link.link === "/"
                  ? router.pathname === link.link
                  : router.pathname.startsWith(link.link)
              }
            />
          ))}
        </Stack>
      </MantineAppShell.Section>
      <MantineAppShell.Section>
        <Stack>
          <NavLink
            component={Link}
            href="/logout"
            children={<IconLogout2 />}
            label="Log out"
          />
          <Code block color="blue">
            <Center>version: {process.env.PACKAGE_VERSION || "local"}</Center>
          </Code>
        </Stack>
      </MantineAppShell.Section>
    </MantineAppShell>
  );
}
