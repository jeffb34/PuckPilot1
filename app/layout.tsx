import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "PuckPilot — Fantasy Hockey Command Center", description: "Custom fantasy hockey draft, matchup, lineup, and streaming analysis.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
