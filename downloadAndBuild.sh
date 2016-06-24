#!/bin/sh
git pull origin master
git pull origin --tags
bash buildDockerImage.sh
