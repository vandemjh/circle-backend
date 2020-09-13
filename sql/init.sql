CREATE EXTENSION IF NOT EXISTS "pgcrypto";
SET timezone = 'America/New_York';

CREATE TABLE posts
(
    pid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(10000) DEFAULT null,
    location VARCHAR(1000) DEFAULT null,
    iid UUID NOT NULL,
    cid UUID DEFAULT gen_random_uuid(),
    fid UUID DEFAULT gen_random_uuid(),
    uid UUID NOT NULL
);

CREATE TABLE comments
(
    cid UUID,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    comment VARCHAR(100000),
    uid UUID NOT NULL
);

CREATE TABLE users
(
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    logins INTEGER NOT NULL DEFAULT 1,
    sub VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    picture VARCHAR(1000) DEFAULT NULL,
    name VARCHAR(100) DEFAULT NULL,
    email_verified boolean DEFAULT FALSE,
    family_name VARCHAR(100) DEFAULT NULL,
    given_name VARCHAR(100) DEFAULT NULL,
    locale VARCHAR(100) DEFAULT 'en',
    nickname VARCHAR(100) DEFAULT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites
(
    fid UUID PRIMARY KEY,
    uid UUID
);

CREATE TABLE images 
(
    iid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    minified bytea, 
    image bytea
);