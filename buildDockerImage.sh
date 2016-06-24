#!/bin/sh
TAG=$(git describe)
TAG_BETA=$(git describe --abbrev=0).$(git rev-list $(git describe --abbrev=0)..HEAD --count).$(git rev-parse --abbrev-ref HEAD)
COMMIT_COUNT_SINCE_TAG=$(git rev-list $(git describe --abbrev=0)..HEAD --count)

if [ $COMMIT_COUNT_SINCE_TAG -eq 0 ]; then
  docker build -t lopc:$TAG .
else
  docker build -t lopc:$TAG_BETA .
fi
