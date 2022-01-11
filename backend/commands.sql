CREATE TABLE blogs(id SERIAL PRIMARY KEY,author VARCHAR(30),url VARCHAR(50) NOT NULL,title VARCHAR(50) NOT NULL,likes INT DEFAULT 0);
INSERT INTO blogs(author,url,title) VALUES('ziv','ziv.com','zivdocker'),('shaked','shaked.com','shakeddocker');
SELECT * FROM blogs;