import { TxnButton } from "@/components/web3ui/TxnButton";
import { Inter } from "next/font/google";
import { erc20Abi } from "viem";
import { wagmiConfig } from "./_app";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <TxnButton
        writeContractArgs={{
          abi: erc20Abi,
          address: "0xfA6209ccbE8402043b25682effCff36723692E96",
          functionName: "transfer",
          args: ["0xcc626cE857cCb909427845aBA0c59445C75Ea5a2", BigInt(1)],
        }}
        useWriteContractArgs={{ config: wagmiConfig }}
      >
        {({ isError, error, isPending, status }) => {
          return (
            <div>
              {isPending && "Loading..."}
              {isError && "Error" + error?.message}
              {status}
            </div>
          );
        }}
      </TxnButton>
    </main>
  );
}
