#!/bin/sh
docker run -d -p 9000:3000 -v /etc/letsencrypt:/certificates --link $2:mongocontainer lopc:$1 
