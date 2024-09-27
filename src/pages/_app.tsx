import { AuthProvider } from "@/components/Provider/AuthContext";
import { BreadcrumbProvider } from "@/components/Provider/BreadCrumbContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (<AuthProvider>
    <BreadcrumbProvider>
    <Component {...pageProps} />
    </BreadcrumbProvider>
  </AuthProvider>
);
}
