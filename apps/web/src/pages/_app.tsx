import "./globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Head from "next/head";

import { api } from "~/utils/api";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <div className={`${poppins.variable} font-Poppins`}>
        <Head>
          <title>Stock App</title>
        </Head>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
