#!/bin/sh
TAG=$(git describe)
docker build -t lopc:$TAG .
