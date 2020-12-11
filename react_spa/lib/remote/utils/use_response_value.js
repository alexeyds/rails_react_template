import { useState, useEffect } from "react";
import { dig } from "utils/object";

export default function useResponseValue(remote, { initial, key }) {
  let [value, setValue] = useState(initial);

  useEffect(() => {
    if (remote.success) setValue(dig(remote.response.body, key));
  }, [remote, key]);

  return value;
}
