INSERT INTO posts(pid, post)
VALUES
(
    'id1',
    ROW(
        ROW(
            'username',
            'firstname',
            'lastname',
            'https://material.angular.io/assets/img/examples/shiba1.jpg'
        ),
        'https://material.angular.io/assets/img/examples/shiba1.jpg',
        'location',
        'description',
        ARRAY[
            ROW(
                ROW(
                    'username',
                    'firstname',
                    'lastname',
                    'https://material.angular.io/assets/img/examples/shiba1.jpg'
                ),
                'this is a comment'
            ),
            ROW(
                ROW(
                    'username',
                    'firstname',
                    'lastname',
                    'https://material.angular.io/assets/img/examples/shiba1.jpg'
                ),
                'this is a comment'
            )
        ]::Comment_type[],
        ARRAY[
            ROW(
                'username',
                'firstname',
                'lastname',
                'https://material.angular.io/assets/img/examples/shiba1.jpg'
            ),
            ROW(
                'username',
                'firstname',
                'lastname',
                'https://material.angular.io/assets/img/examples/shiba1.jpg'
            )
        ]::User_type[]
    )
);

SELECT * FROM posts;