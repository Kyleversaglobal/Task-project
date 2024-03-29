import { ReactNode } from "react";

export const UnauthenticatedLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};
