import { ReactNode } from "react";
import NavBar from "../../navbar";

export const AuthenticatedLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};
