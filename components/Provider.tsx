"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * (60 * 1000),
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: PropsWithChildren<{}>) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Providers;
