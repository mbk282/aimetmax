import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vergaderkosten Calculator - Wat kost jouw vergadering?",
  description:
    "Bereken in real-time wat een vergadering kost. Zie de teller lopen en ontdek hoeveel vergaderingen jouw organisatie per jaar kosten.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
