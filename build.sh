#!/bin/bash

cd blockly/ && python2.7 build.py && cd ..
cd arduino/ && python2.7 build.py && cd ..
python3.5 package/build_docs.py 
python3.5 package/build_pyinstaller.py 
cd package/electron/ && npm install && cd ../..
cd package/electron/ && npm run release && cd ../..
python3.5 package/pack_ardublockly.py 
