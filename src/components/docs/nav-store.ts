"use client";

import { useSyncExternalStore } from "react";

// The mobile drawer is opened from the header and lives in the sidebar; both
// read this one value instead of sharing a provider across the layout.
let open = false;
const listeners = new Set<() => void>();

export function setNavigationOpen(value: boolean) {
  if (open === value) return;
  open = value;
  listeners.forEach((listener) => listener());
}

export function useNavigationOpen() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => open,
    () => false,
  );
}
