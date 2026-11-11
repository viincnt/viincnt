import type { ReactNode } from "react";

/** Renders dictionary strings that mark emphasis with <em>…</em>. */
export function Rich({ text, em }: { text: string; em: string }): ReactNode {
  return text.split(/<em>(.*?)<\/em>/g).map((part, index) =>
    index % 2 === 1 ? (
      <em key={index} className={em}>
        {part}
      </em>
    ) : (
      part
    ),
  );
}
