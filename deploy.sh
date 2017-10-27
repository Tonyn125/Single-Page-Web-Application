#!/bin/bash
#set -e # Exit with nonzero exit code if anything fails

server(){
  ssh -i key -o StrictHostKeyChecking=no root@direct.sonderconnection.com. "$@"

}

server "cd /Sonder && ls "
server "cd /Sonder && docker-compose down"

echo "remove all containers"
server docker rm -f $(server docker ps -a -q)

echo "remove all images"
server docker rmi $(server docker images -q)

echo  "remove all volumes"
server docker volume rm $(docker volume ls -f dangling=true -q)


echo "remove dir"
server "rm -rf /Sonder"

echo "copy files"

scp -i key -r ./ root@direct.sonderconnection.com:/Sonder

echo "start sever"

server "cd /Sonder && docker-compose build --pull --no-cache --force-rm && docker-compose up --remove-orphans -d"
