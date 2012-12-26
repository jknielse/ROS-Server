#!/bin/bash 
#This script takes one argument (the ip of the EC2 instance),
#copies over my ssh keys, clones this repo on that server, and then runs the setup script.

if [ $# -ne 1 ]
then
    echo "Usage: prepareServer.sh <ip of server>"
    echo "Example: prepareServer.sh ec2-23-22-102-16.compute-1.amazonaws.com"
    exit 1
fi

echo "Preparing to copy ssh keys to $1"

scp -v ~/.ssh/id_rsa ubuntu@$1:~/.ssh/
scp -v ~/.ssh/id_rsa.pub ubuntu@$1:~/.ssh/
scp -v ~/.ssh/known_hosts ubuntu@$1:~/.ssh/

echo "Done copying keys"
echo "Installing git"

ssh ubuntu@$1 sudo apt-get install -y git

echo "Cloning ROS-Server.git"

ssh ubuntu@$1 git clone git@github.com:jknielse/ROS-Server.git

echo "Running setup.sh"

ssh ubuntu@$1 sudo /home/ubuntu/ROS-Server/setup.sh 
