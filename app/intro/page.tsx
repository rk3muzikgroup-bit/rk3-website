// app/intro/page.tsx
import type { Metadata } from "next";
import IntroClient from "../../components/IntroClient";

export const metadata: Metadata = {
  title: "RK3 • Launch",
  description: "NASA zoom → Cockpit",
};

export default function IntroPage() {
  return <IntroClient />;
}
