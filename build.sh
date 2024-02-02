#!/usr/bin/env bash

# Download Node.js
mkdir -p build

if [ ! -f "build/node-arm64.zip" ]; then
  curl -L https://nodejs.org/dist/v20.11.0/node-v20.11.0-win-arm64.zip -o build/node-arm64.zip
fi
if [ ! -f "build/node-x64.zip" ]; then
  curl -L https://nodejs.org/dist/v20.11.0/node-v20.11.0-win-x64.zip -o build/node-x64.zip
fi

# unzip if needed

if [ ! -d "build/node-arm64" ]; then
  mkdir -p build/node-arm64
  unzip build/node-arm64.zip -d build/node-arm64
fi
if [ ! -d "build/node-x64" ]; then
  mkdir -p build/node-x64
  unzip build/node-x64.zip -d build/node-x64
fi

# create tmp directory for source files
mkdir -p build/tmp

# copy source files
cp -r dist/ build/tmp/
cp -r build-backend/* build/tmp/backend
cp package.json build/tmp

# install dependencies
cd build/tmp
npm install --omit=dev
cd ../..

# make output directories
if [ -d "build/arm64" ]; then
  rm -rf build/arm64
fi
if [ -d "build/x64" ]; then
  rm -rf build/x64
fi
mkdir -p build/arm64/bin
mkdir -p build/x64/bin

# copy tmp to output
echo "Copying files to output directories"
cp -r build/tmp/* build/arm64
cp -r build/tmp/* build/x64

# copy node files
echo "Copying node files"
cp -r build/node-arm64/*/* build/arm64/bin
cp -r build/node-x64/*/* build/x64/bin

# copy entrypoint
echo "Copying entrypoint"
mv build/app-entrypoint-arm64.exe build/arm64/app.exe
mv build/app-entrypoint-x64.exe build/x64/app.exe

# remove temporary folder
rm -rf build/tmp

# zip
echo "Zipping"
cd build
if [ -f "app-arm64.zip" ]; then
  rm app-arm64.zip
fi
zip -r app-arm64.zip arm64
if [ -f "app-x64.zip" ]; then
  rm app-x64.zip
fi
zip -r app-x64.zip x64
cd ..
