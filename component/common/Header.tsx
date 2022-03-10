import Head from "next/head";

export function Header({ title }: { title: string }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          charSet="utf-8"
        />
      </Head>
    </>
  );
}
