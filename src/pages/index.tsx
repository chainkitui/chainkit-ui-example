import { TxnButton } from "@/components/web3ui/TxnButton";
import { Inter } from "next/font/google";
import { erc20Abi } from "viem";
import { wagmiConfig } from "./_app";
import { useToast } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { toast } = useToast();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <TxnButton
        onTxnSuccess={({ data }) => {
          console.log("Txn data", data);
          toast({
            description: "Transaction completed successfully",
          });
        }}
        onTxnError={({ error }) => {
          console.log("Txn error", error?.cause);
          toast({
            description: "Transaction Failed",
            variant: "destructive",
          });
        }}
        writeContractArgs={{
          abi: erc20Abi,
          address: "0xB41aD4424a9ddB0D680b7aCB3493139742a1b953",
          functionName: "transfer",
          args: ["0xcc626cE857cCb909427845aBA0c59445C75Ea5a2", BigInt(1)],
        }}
        useWriteContractArgs={{ config: wagmiConfig }}
      >
        {({ isError, error, isPending, status,  }) => {
          return (
            <div>
              {status === 'success' && "Success"}
              {status === 'idle' && "Send Txn"}
              {status === 'pending' && "Loading..."}
              {isPending && "Loading..."}
              {isError && "Error" + error?.message}
              {error && error?.message}
            </div>
          );
        }}
      </TxnButton>
    </main>
  );
}
