import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { goerli } from "viem/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [goerli],
  transports: {
    [goerli.id]: http(),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
