ssh -T pi@circle.local << EOSSH
sudo docker run \
  --name circle-backend \
  -p 3000:3000 \
  -d $(docker build -q .)
EOSSH