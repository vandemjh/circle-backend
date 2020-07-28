CREATE EXTENSION IF NOT EXISTS "pgcrypto";
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS Comment_type CASCADE;
DROP TYPE IF EXISTS Post_type CASCADE;
DROP TYPE IF EXISTS User_type CASCADE;

CREATE TYPE User_type AS 
(
    username text,
    firstName text,
    lastName text,
    profilePictureURL text
);

CREATE TYPE Comment_type AS 
(
    commenter User_type,
    comment text
);

CREATE TYPE Post_type AS
(
	poster User_type,
    imageUrl text,
    location text,
    description text,
    comments Comment_type[],
    likes User_type[]
);

CREATE TABLE posts
(
    pid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post Post_type
);

CREATE TABLE users
(
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_col User_type
);