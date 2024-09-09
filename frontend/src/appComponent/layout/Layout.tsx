import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>{children}</div>
    </div>
  );
};
export default Layout;
