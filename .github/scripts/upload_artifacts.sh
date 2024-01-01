#!/bin/bash

# Variables passed from the workflow
ASSET_URL=$1
NEW_VERSION=$2
GITHUB_TOKEN=$3

# Trim off the end of the URL
ASSET_URL="${ASSET_URL%\{*}"

echo "Uploading Android App..."
curl \
  -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: $(file -b --mime-type ./android.wdio.native.app.$NEW_VERSION.apk)" \
  --data-binary @./android.wdio.native.app.$NEW_VERSION.apk \
  "$ASSET_URL?name=android.wdio.native.app.$NEW_VERSION.apk"

echo "Uploading iOS App..."
curl \
  -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: $(file -b --mime-type ./ios.simulator.wdio.native.app.$NEW_VERSION.zip)" \
  --data-binary @./ios.simulator.wdio.native.app.$NEW_VERSION.zip \
  "$ASSET_URL?name=ios.simulator.wdio.native.app.$NEW_VERSION.zip"
