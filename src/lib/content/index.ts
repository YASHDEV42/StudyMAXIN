import "server-only";
import { cache } from "react";
import { loadContent } from "./load";

// Shared by static generation and Server Components; never import into a Client Component.
export const getContent = cache(() => loadContent());
