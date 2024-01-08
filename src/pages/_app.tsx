import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { getLayout } from "../../utils/get-layout";
import { FC } from "react";

const WrapperLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();

  const Layout = getLayout(pathname);

  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WrapperLayout>
      <Component {...pageProps} />
    </WrapperLayout>
  );
};

export default App;
