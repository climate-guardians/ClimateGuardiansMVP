#!/bin/bash

echo "Deploy contracts"

node scripts/deploy.js

echo "mint Pack"

node scripts/mintPack.js

echo "open Pack"

node scripts/openPack.js