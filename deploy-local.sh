# sudo docker rm circle-backend
ssh -T pi@circle-backend.local << EOSSH
cd ~/circle-backend
sudo docker stop circle-backend
sudo docker run --name circle-backend -p 3000:3000 -d \$(sudo docker build -q .)
EOSSH