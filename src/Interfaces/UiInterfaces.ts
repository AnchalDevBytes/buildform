import { ReactNode } from "react";
import { GetFormStats } from "../../actions/form";

export interface StatsCardsProps {
    data?: Awaited<ReturnType<typeof GetFormStats>>;
    loading: boolean;
  }
  
  export interface StatsCardInterface {
    title: string;
    value: string;
    helperText: string;
    className: string;
    loading: boolean;
    icon: ReactNode;
  }