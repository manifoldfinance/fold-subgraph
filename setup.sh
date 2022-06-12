#!/usr/bin/env bash

yarn --version
yarn install
yarn run codegen-env
yarn run codegen
yarn run build

