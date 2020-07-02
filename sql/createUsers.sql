DROP TABLE users;
CREATE TABLE users
(
	username varchar(15),
	uid integer,
	email varchar
);
insert into users
(
	users(username, uid, email) values
	(
		"admin",
		123,
		"jack@jackv.dev"
	)
)
