import React from "react";
import TestRouter from "test/support/test_router";

export default function ApplicationEnv({initialPath, children}) {
  return <TestRouter initialPath={initialPath}>{children}</TestRouter>;
}