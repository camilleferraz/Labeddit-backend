-- Active: 1675271780970@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME())
);

    CREATE TABLE posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        comments INTEGER,
        FOREIGN KEY (creator_id) REFERENCES users(id)
            ON DELETE CASCADE 
            ON UPDATE CASCADE 
    );


CREATE TABLE likes_and_dislikes (
    user_id TEXT  NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)

);

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_and_dislikes;

DROP TABLE posts;

INSERT INTO users (id, name, email, password, role)
VALUES
("u001","Maria","maria@email.com","123456","NORMAL"),
("u002","Joana","joana@email.com","345678","ADMIN");

INSERT INTO posts (id, creator_id, content)
VALUES
("p001","u001","Jantar em família"),
("p002","u002","Um dia de praia");

CREATE TABLE
    comments (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        post_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        comments TEXT NOT NULL,
        likes INTEGER,
        dislikes INTEGER,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

INSERT INTO comments (id, post_id, user_id, comments)
VALUES
    ("c001", "p001", "u002", "Muito legal!"),
    ("c002", "p003", "u001", "Solzão");


CREATE TABLE
    comments_likes_dislikes (
        post_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        comments_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (comments_id) REFERENCES comments (id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    SELECT * FROM comments;
    







