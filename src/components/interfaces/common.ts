import { ReactNode } from "react";
import * as React from "react";

export interface ChildrenComponent {
  children?: ReactNode;
}

export interface OuterComponent {
  children?: React.ReactElement | null;
}
