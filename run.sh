#!/usr/bin/env bash
set -e
set -x

export NODE_ENV="${NODE_ENV:-development}"

if [ $NODE_ENV != "production" ]; then
  npm run start
else
 #here we can use nginx for example
  npm run build && npm run start
fi
