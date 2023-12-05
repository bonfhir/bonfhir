import { AppShell, NavLink, Stack } from "@mantine/core";
import {
  IconBuilding,
  IconCalendar,
  IconClipboardData,
  IconCreditCard,
  IconHome,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { link: "/", label: "Home", icon: <IconHome /> },
  { link: "/calendar", label: "Calendar", icon: <IconCalendar /> },
  { link: "/patients", label: "Patients", icon: <IconUsers /> },
  {
    link: "/organizations",
    label: "Organizations",
    icon: <IconBuilding />,
  },
  { link: "/claims", label: "Claims", icon: <IconCreditCard /> },
  { link: "/reports", label: "Reports", icon: <IconClipboardData /> },
  { link: "/settings", label: "Settings", icon: <IconSettings /> },
];

export default function AppNavbar() {
  const pathname = usePathname();
  return (
    <AppShell.Section grow mt="xs">
      <Stack gap={0}>
        {links.map((link) => (
          <NavLink
            key={link.label}
            component={Link}
            href={link.link}
            leftSection={link.icon}
            label={link.label}
            active={
              link.link === "/"
                ? pathname === link.link
                : pathname?.startsWith(link.link)
            }
          />
        ))}
      </Stack>
    </AppShell.Section>
  );
}
