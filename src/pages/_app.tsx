import ManagedModal from "@/components/common/modal/manage-modal";
import { ManagedUIContext } from "@/context/uiContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement } from "react";
const Noop: React.FC = ({ children }: any) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =(Component as any).getLayout ?? ((page: ReactElement) => page);
  return (
    <ManagedUIContext>
      {getLayout(<Component {...pageProps} />)}
      <ManagedModal />
    </ManagedUIContext>
  );
}
