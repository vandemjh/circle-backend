function cannotBeBlank() {
	if [ -z "$1" ] 
	then
		echo field cannot be blank!
		exit 1
	fi
}
echo '=== Circle Deploy ==='
echo '--- Front End ---'
read -p "CLIENT_ID: " CLIENT_ID
cannotBeBlank $CLIENT_ID
read -p "DOMAIN: " DOMAIN
cannotBeBlank $DOMAIN
read -p "AUDIENCE: " AUDIENCE
cannotBeBlank $AUDIENCE
echo '--- Back End ---'
read -p "ORIGIN: " ORIGIN
cannotBeBlank $ORIGIN
read -p "SKIP_LOGGING (false): " SKIP_LOGGING
if [ -z "$SKIP_LOGGING" ] 
then
	SKIP_LOGGING='false'
fi
read -p "DEBUG (false): " DEBUG
if [ -z "$DEBUG" ] 
then
	DEBUG='false'
fi
read -p "PORT (3000): " PORT
if [ -z "$PORT" ] 
then
	PORT='3000'
fi
read -p "MINIFIED (false): " MINIFIED
if [ -z "$MINIFIED" ] 
then
	MINIFIED='false'
fi
read -p "JWKS_URI: " JWKS_URI
cannotBeBlank $JWKS_URI
read -p "ISSUER: " ISSUER
cannotBeBlank $ISSUER
echo '--- Database ---'
read -p "STARTUP (true): " STARTUP
if [ -z "$STARTUP" ] 
then
	STARTUP='true'
fi
read -p "TEST_POSTS (false): " TEST_POSTS
if [ -z "$TEST_POSTS" ] 
then
	TEST_POSTS='false'
fi
read -p "DROP_TABLES (false): " DROP_TABLES
if [ -z "$DROP_TABLES" ] 
then
	DROP_TABLES='false'
fi
read -p "PGUSER: " PGUSER
cannotBeBlank $PGUSER
read -p "PGHOST: " PGHOST
cannotBeBlank $PGHOST
read -p "PGPASSWORD: " PGPASSWORD
cannotBeBlank $PGPASSWORD
read -p "PGDATABASE: " PGDATABASE
cannotBeBlank $PGDATABASE
read -p "PGPORT: " PGPORT
cannotBeBlank $PGPORT
echo '=== Done ==='
read -p "Run in Production? (yes): " PROD
if [ -z "$NODE_ENV" ] 
then
	NODE_ENV='production'
else
	NODE_ENV='development'
fi

sudo docker run \
--env CLIENT_ID=$CLIENT_ID \
--env DOMAIN=$DOMAIN \
--env AUDIENCE=$AUDIENCE \
--env ORIGIN=$ORIGIN \
--env SKIP_LOGGING=$SKIP_LOGGING \
--env SKIP_TOKENS=$SKIP_TOKENS \
--env DEBUG=$DEBUG \
--env PORT=$PORT \
--env MINIFIED=$MINIFIED \
--env JWKS_URI=$JWKS_URI \
--env ISSUER=$ISSUER \
--env STARTUP=$STARTUP \
--env TEST_POSTS=$TEST_POSTS \
--env DROP_TABLES=$DROP_TABLES \
--env PGUSER=$PGUSER \
--env PGHOST=$PGHOST \
--env PGPASSWORD=$PGPASSWORD \
--env PGDATABASE=$PGDATABASE \
--env PGPORT=$PGPORT \
--env NODE_ENV=$NODE_ENV \
-p $PORT:$PORT \
-d \
--restart unless-stopped \
$(sudo docker build -q .)

