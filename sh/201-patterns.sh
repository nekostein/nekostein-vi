#!/bin/bash

for js in patterns/js/*.js; do
    ./make.sh "$js" png
done
