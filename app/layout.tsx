import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata: Metadata = {
    title: "BuildRizz",
    description: "Your AI-Powered Code Companion",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ConvexClientProvider>
                    <Provider>
                        {children}
                    </Provider>
                </ConvexClientProvider>
            </body>
        </html>
    );
}
