import {
  AuthenticatedLayout,
  UnauthenticatedLayout,
} from "../components/Layout";
import { Fragment } from "react";

export function getLayout(pathname: string) {
  if (pathname.match(/^\/login/)) {
    return UnauthenticatedLayout;
  }

  if (pathname.match(/^\/table/)) {
    return AuthenticatedLayout;
  }

  return Fragment;
}
