#!/bin/bash
#This script is intended to setup all of the dependancies required for 
#the rest of this code to run properly. It assumes that it is running on
#an EC2 instance with the Ubuntu 12.04 image installed.



if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

echo "Running 'apt-get update'..."

apt-get update &> /dev/null

[ $? -ne 0 ] && echo Update failed, exiting script && exit 1

echo "Installing prerequisite packages from prereqs.cfg"

while read -r pkg
do
    echo "  Installing $pkg"
    apt-get install --force-yes "$pkg" &> /dev/null
    [ $? -eq 0 ] && { continue; }
done < /home/ubuntu/ROS-Server/prereqs.cfg

cd ~

git clone git://github.com/joyent/node.git

cd node

git checkout v0.6.8

./configure

make

make install

cd ..

git clone https://github.com/isaacs/npm.git

cd npm

sudo make install
