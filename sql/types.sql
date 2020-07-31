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
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP(),
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