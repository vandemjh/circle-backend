ssh -T pi@circle-backend.local << EOSSH
cd ~/circle-backend
git pull
sudo docker stop \$(docker ps -aq);
sudo docker rm -f \$(docker ps -aq);
sudo docker run --name circle-backend -p 3000:3000 --restart=always -d \$(sudo docker build -q .)
EOSSH

# ENV=`cat .env`
# echo $ENV
# ssh -T pi@circle-backend.local "${ENV} echo $PGPORT"