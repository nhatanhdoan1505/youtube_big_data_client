import { store } from "@app/index";
import { ChakraProvider } from "@chakra-ui/react";
import { EmptyLayout } from "@layout/EmptyLayout";
import { AppPropsWithLayout } from "@models/index";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { theme } from "@utils/index";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;
