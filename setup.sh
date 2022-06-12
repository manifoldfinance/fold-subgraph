#!/usr/bin/env bash
git config --global url."https://github.com/".insteadOf git@github.com:
git config --global url."https://".insteadOf git://

npm install
npm run codegen-env
npm run codegen
npm run build
