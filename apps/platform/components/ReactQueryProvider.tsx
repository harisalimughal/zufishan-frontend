'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'

/**
 * ReactQueryProvider
 *
 * Wraps the app with a QueryClient so any page can call useQuery/useMutation.
 * Created once per browser session — staleTime of 5 min is a sensible default.
 */
export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Don't refetch on window focus by default (adjust per-query if needed)
            refetchOnWindowFocus: false,
            // Data is considered fresh for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Retry once on failure
            retry: 1,
          },
        },
      }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
