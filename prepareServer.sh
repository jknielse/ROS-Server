#!/bin/bash 
#This script takes one argument (the ip of the EC2 instance),
#copies over my ssh keys, clones this repo on that server, and then runs the setup script.

if [ $# -ne 1 ]
then
    echo "Usage: prepareServer.sh <ip of server>"
    echo "Example: prepareServer.sh ec2-23-22-102-16.compute-1.amazonaws.com"
    exit 1
fi

scp ~/.ssh/id_rsa ubuntu@$1:~/.ssh/
scp ~/.ssh/id_rsa.pub ubuntu@$1:~/.ssh/

ssh ubuntu@$1 git clone git@github.com:jknielse/ROS-Server.git
ssh ubuntu@$1 sudo /home/ubuntu/ROS-Server/setup.sh
