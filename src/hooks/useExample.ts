import { useState } from "react";

export function useExample() {
  const [count, setCount] = useState(0);
  return { count, increment: () => setCount(count + 1) };
}
