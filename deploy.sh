#!/bin/bash

# Copy server files
scp index.js package.json yarn.lock portfolio:~/portfolio

# Build and copy client files
rm -r ./client/build
yarn --cwd ./client build
ssh portfolio 'rm -r ~/portfolio/client && rm -r ~/portfolio/resources'
scp -r ./client/build portfolio:~/portfolio/client/
scp -r ./resources portfolio:~/portfolio/resources

# Run yarn install and restart the server
ssh portfolio '~/scripts/restart-portfolio.sh'
