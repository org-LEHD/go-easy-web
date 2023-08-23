import { Button } from "@mantine/core";
import Link from "next/link";

export type NavItemProps = {
  text: string;
  href: string;
};

export const NavItem: React.FC<NavItemProps> = ({ text, href }) => {
  return (
    <Link href={href}>
      <Button variant="subtle">{text}</Button>
    </Link>
  );
};
