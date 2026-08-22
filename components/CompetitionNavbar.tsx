"use client";

import { Home, Mountain, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  gymSlug: string;
  competitionSlug: string;
}

const competitionNavbar = ({ gymSlug, competitionSlug }: Props) => {
  const pathname = usePathname();
  const baseUrl = `/${gymSlug}/${competitionSlug}`;

  const navItems = [
    { label: "Comp Home", icon: <Home />, href: baseUrl },
    { label: "Problems", icon: <Mountain />, href: `${baseUrl}/problems` },
    { label: "Leaderboard", icon: <Trophy />, href: `{${baseUrl}/leaderboard` },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-2xl justify-around py-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.href}
              className={`flex flex-col items-center ${active && "text-green-600 border-b-2"}`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default competitionNavbar;
