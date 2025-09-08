import { useState } from "react";

export default function Button(props: { children: string }) {
  const [disabled, setDisabled] = useState<boolean>();

  return (
    <button
      type="button"
      className="rounded-lg px-3 py-1.5 text-white bg-blue-700 hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 transition-colors"
      onClick={() => setDisabled(true)}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
}
