import { ReactNode } from "react";
import { Header } from "./ Header/header";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="App px-2">
      <Header />
      {children}
    </div>
  );
}
