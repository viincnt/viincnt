import { notFound } from "next/navigation";

// This route only ever 404s; without its own metadata the client swaps the title back to the layout's.
export { generateMetadata } from "../not-found";

export default function CatchAll() {
  notFound();
}
