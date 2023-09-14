import { ReactNode } from "react";
import { getServerSession } from "next-auth";

import { Toaster } from "react-hot-toast";
import "../styles/global.css";

import { Poppins } from "next/font/google";

import Sidebar from "@/components/sidebar/Sidebar";
import Followbar from "@/components/followbar/Followbar";
import SecondaryLayout from "@/components/secondaryLayout/SecondaryLayout";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";

import { authOptions } from "@/libs/authOptions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: 'X Clone',
  description: 'X Clone made with NextJS App Router.'
}

type RootLayoutProps = {
  children: ReactNode;
};
const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body className={poppins.className}>
        <NextAuthSessionProvider>
          {session ? (
            <div className="h-full mx-auto xl:px-30 max-w-6xl">
              <div className="flex flex-col md:flex-row lg:justify-between md:justify-center min-h-screen">
                <Sidebar session={session} />
                <main className="app">{children}</main>
                <Followbar />
              </div>
            </div>
          ) : (
            <main>
              <SecondaryLayout />
              {children}
            </main>
          )}
        </NextAuthSessionProvider>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#1D9BF0",
                secondary: "#FFFFFF",
              },
            },
            error: {
              duration: 3000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#FFFFFF",
              },
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
