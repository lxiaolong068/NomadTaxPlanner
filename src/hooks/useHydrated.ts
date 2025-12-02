"use client";

import { useSyncExternalStore } from "react";

/**
 * Hook for hydration-safe mounting detection.
 * Returns false during SSR and true after client-side hydration.
 *
 * Use this to prevent hydration mismatches when accessing browser-only
 * APIs like localStorage (e.g., with Zustand persist middleware).
 *
 * @example
 * ```tsx
 * const mounted = useHydrated();
 *
 * if (!mounted) {
 *   return <LoadingSkeleton />;
 * }
 *
 * return <ComponentWithLocalStorage />;
 * ```
 */
const emptySubscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
