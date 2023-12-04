import { Avatar, Button, Group, Menu } from "@mantine/core";
import { IconChevronDown, IconLogin, IconLogout } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "./logo.svg";

export default function AppHeader() {
  return (
    <Group justify="space-between" bg="blue" h="100%" px="md" py="xs">
      <Image src={logo} alt="logo" priority={true} />
      <UserMenu />
    </Group>
  );
}

function UserMenu() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <Button
        onClick={() => signIn("medplum")}
        size="xs"
        leftSection={<IconLogin size="1rem" />}
      >
        Login
      </Button>
    );
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          size="xs"
          leftSection={
            <Avatar color="white" size="sm">
              {initials(session.user?.profile?.display)}
            </Avatar>
          }
          rightSection={<IconChevronDown size="1rem" />}
        >
          {session.user?.profile?.display}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => signOut({ callbackUrl: "/" })}
          leftSection={<IconLogout size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function initials(name: string | undefined) {
  return name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}
