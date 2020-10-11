#!/bin/bash

node ./scripts/test "$@" | node_modules/.bin/tap-spec-dot
