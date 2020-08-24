docker run --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=dbuser \
  -e POSTGRES_DB=db \
  -e PGDATA=/var/lib/postgresql/data \
  -v ~/database:/var/lib/postgresql/data \
  -p 5432:5432 \
  -d postgres
