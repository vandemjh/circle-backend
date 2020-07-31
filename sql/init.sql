CREATE EXTENSION IF NOT EXISTS "pgcrypto";
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
SET timezone = 'America/New_York';

CREATE TABLE posts
(
    pid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(10000) DEFAULT null,
    location VARCHAR(1000) DEFAULT null,
    imageurl VARCHAR(1000) DEFAULT null,
    cid UUID DEFAULT gen_random_uuid(),
    lid UUID DEFAULT gen_random_uuid(),
    uid UUID NOT NULL
);

CREATE TABLE comments
(
    cid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    comment VARCHAR(100000),
    commenter UUID
);

CREATE TABLE users
(
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(1000),
    firstname VARCHAR(1000) DEFAULT NULL,
    lastname VARCHAR(1000) DEFAULT NULL,
    profilepictureurl varchar(1000) DEFAULT NULL
);

CREATE TABLE likes
(
    lid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    liker UUID
)