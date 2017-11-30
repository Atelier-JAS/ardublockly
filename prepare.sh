#!/bin/bash

git clone -q --branch=master https://github.com/carlosperate/ardublockly.git
cd ardublockly/
git checkout -qf 12524014c052781380b0eea3858ae2a8626b45f6
git submodule update --init --recursive

pip3.5 install pyinstaller
pip3.5 install mkdocs
pip3.5 install coverage
pip3.5 install requests
pip2.7 install coverage
pip2.7 install requests
pip2.7 install mock
pip2.7 install freeze

cd blockly/ && python2.7 build.py && cd ..
python3.5 package/build_docs.py 
python3.5 package/build_pyinstaller.py 
cd package/electron/ && npm install && cd ../..
cd package/electron/ && npm run release && cd ../..
python3.5 package/pack_ardublockly.py 
