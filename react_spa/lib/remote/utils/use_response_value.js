import { useState, useEffect } from "react";

export default function useResponseValue(remote, { initial, extract }) {
  let [value, setValue] = useState(initial);

  useEffect(() => {
    if (remote.success) setValue(extract(remote.response));
  }, [remote, extract]);

  return value;
}
