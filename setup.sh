#!/usr/bin/env bash
git config --global url."https://github.com/".insteadOf git@github.com:
git config --global url."https://".insteadOf git://

yarn --version
yarn install
yarn run codegen-env
yarn run codegen
yarn run build

