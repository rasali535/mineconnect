import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AntdRegistry } from "@/lib/AntdRegistry";
import { ConfigProvider } from "antd";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Debswana Connect – Mining Industry Platform",
  description:
    "Debswana Connect is the all-in-one platform for mining operations – supplier management, contractor compliance, recruitment, community, and AI-powered insights.",
  keywords: "mining, suppliers, contractors, compliance, recruitment, khoemacau",
  openGraph: {
    title: "Debswana Connect – Mining Industry Platform",
    description: "Connecting the mining industry through technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", inter.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-full">
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#B87333', // Copper color
                colorInfo: '#B87333',
                colorBgLayout: '#f4f4f5', // zinc-100
                fontFamily: 'var(--font-inter)',
                borderRadius: 4, // More industrial/sharp feel
              },
              components: {
                Button: {
                  borderRadius: 4,
                  controlHeight: 40,
                },
                Input: {
                  borderRadius: 4,
                  controlHeight: 40,
                },
                Select: {
                  borderRadius: 4,
                  controlHeight: 40,
                },
                Card: {
                  borderRadiusLG: 8,
                }
              }
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
