import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { getLayout } from "../../utils/get-layout";
import { FC } from "react";
import { Provider } from "react-redux";
import { createStore } from "../store";
import HomePage from "./homepage";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

const WrapperLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();
  const Layout = getLayout(pathname);

  console.log("Layout:", Layout);

  return (
    <>
      <Layout>
        {pathname === "/" && <HomePage />}
        {children}
      </Layout>
    </>
  );
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const store = createStore();
  return (
    <WrapperLayout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </WrapperLayout>
  );
};

export default App;
