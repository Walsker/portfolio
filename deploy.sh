#!/bin/bash

# Copy server files
scp index.js package.json yarn.lock portfolio:~/portfolio

# Build and copy client files
yarn --cwd ./client build
ssh portfolio 'rm -r ~/portfolio/client'
scp -r ./client/build portfolio:~/portfolio/client/

# Run yarn install and restart the server
ssh portfolio '~/scripts/restart-portfolio.sh'
