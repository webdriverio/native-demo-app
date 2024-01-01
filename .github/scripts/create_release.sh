#!/bin/bash

# Variables passed as environment
TOKEN=$GITHUB_TOKEN
TAG_NAME=$TAG_NAME
RELEASE_NAME=$RELEASE_NAME
BODY=$BODY
DRAFT=$DRAFT
PRE_RELEASE=$PRE_RELEASE

# Repository info
REPO_OWNER=$(jq -r ".repository.owner.login" $GITHUB_EVENT_PATH)
REPO_NAME=$(jq -r ".repository.name" $GITHUB_EVENT_PATH)

# GitHub API URL for creating a release
API_URL="https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases"

# Data for the release
DATA=$(jq -n --arg tag_name "$TAG_NAME" \
               --arg name "$RELEASE_NAME" \
               --arg body "$BODY" \
               --argjson draft $(echo $DRAFT | tr '[:upper:]' '[:lower:]') \
               --argjson prerelease $(echo $PRE_RELEASE | tr '[:upper:]' '[:lower:]') \
               '{tag_name: $tag_name, name: $name, body: $body, draft: $draft, prerelease: $prerelease}')

# Make a POST request to create the release
RESPONSE=$(curl -H "Authorization: token $TOKEN" \
                -H "Content-Type: application/json" \
                --data "$DATA" \
                $API_URL)

# Check if the release was successfully created
RELEASE_ID=$(echo $RESPONSE | jq -r ".id")

if [ "$RELEASE_ID" != "null" ]; then
  echo "Release created successfully! ID: $RELEASE_ID"
  ASSET_URL=$(echo $RESPONSE | jq -r ".upload_url")
  ASSET_URL="${ASSET_URL%\{*}"
  echo "ASSET_URL=$ASSET_URL" >> $GITHUB_ENV
else
  echo "Failed to create release"
  echo "Response:"
  echo $RESPONSE
  exit 1
fi
