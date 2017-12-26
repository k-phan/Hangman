#!/bin/bash
cd /srv/hangman/
npm install 

mongo hangman --eval "db.dropDatabase()"

pm2 describe hangman > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start /srv/hangman/bin/hangman
else
  pm2 restart hangman
fi;