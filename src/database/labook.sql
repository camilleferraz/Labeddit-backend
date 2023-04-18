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
    content TEXT,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,

    FOREIGN KEY (creator_id) REFERENCES users(id)
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

INSERT INTO users (id, name, email, password, role)
VALUES
("u001","Maria","maria@email.com","123456","NORMAL"),
("u002","Joana","joana@email.com","345678","ADMIN");

INSERT INTO posts (id, creator_id, content)
VALUES
("p001","u001","Jantar em família"),
("p002","u002","Um dia de praia");





