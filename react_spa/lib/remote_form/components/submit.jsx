import React from "react";
import { useClosestRemote } from "remote/closest_remote";
import { LoadingButton } from "remote/components";

export default function Submit(props) {
  let remote = useClosestRemote();
  return <LoadingButton type='submit' remote={remote} {...props}></LoadingButton>;
}