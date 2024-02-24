// import { AppRouter } from "@stockHub/api";
// import { withTRPC } from "@trpc/next";
// import { AppType } from "next/app";

// const MyApp: AppType = ({ Component, pageProps }) => {
//   return <Component {...pageProps} />;
// };

// export default withTRPC<AppRouter>({
//   config({ ctx }) {
//     const url = process.env.VERCEL_URL
//       ? `https://${process.env.VERCEL_URL}/api/trpc`
//       : "http://localhost:3000/api/trpc";

//     return {
//       links: "",
//       url,
//       // Add any other properties required by WithTRPCConfig here
//       // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
//     };
//   },
//   ssr: true,
// })(MyApp);

import "./globals.css";
import type { AppType } from "next/app";
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
    <div className={`${poppins.variable} font-Poppins`}>
      <Head>
        <title>Stock App</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default api.withTRPC(MyApp);
