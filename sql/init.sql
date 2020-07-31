CREATE EXTENSION IF NOT EXISTS "pgcrypto";
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE posts
(
    pid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    poster UUID,
    comments UUID DEFAULT gen_random_uuid(),
    likes UUID DEFAULT gen_random_uuid()
);

CREATE TABLE comments
(
    cid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    commentor UUID,
    comment VARCHAR(10000)
);

CREATE TABLE users
(
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(100),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    profilepictureurl varchar(100)
);

CREATE TABLE likes
(
    lid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    likers UUID
)