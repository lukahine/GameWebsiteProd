use hosting_db;
CREATE TABLE permissions (
    permissionID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    permissionName VARCHAR(50) NOT NULL,
    permissionAdd BOOLEAN NOT NULL,
    permissionEdit BOOLEAN NOT NULL
);

CREATE TABLE users (
    userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    userEmail VARCHAR(100) NOT NULL UNIQUE,
    userPassword VARCHAR(255) NOT NULL,
    permissionID INT NOT NULL,
    FOREIGN KEY (permissionID) REFERENCES permissions(permissionID)
);

INSERT INTO permissions (permissionName, permissionAdd, permissionEdit) VALUES ('admin', true, true);

INSERT INTO permissions (permissionName, permissionAdd, permissionEdit) VALUES ('user', false, false);

CREATE TABLE games (
	GameID INT  NOT NULL AUTO_INCREMENT,
    GameName varchar(256) NOT NULL,
    GameDescription varchar(500) NOT NULL,
	url varchar(256) NOT NULL,
    OwnerID varchar(32) NOT NULL,
    PRIMARY KEY (GameID),
    FOREIGN KEY (OwnerID) REFERENCES users(userID)
);

CREATE TABLE comments (
    commentID INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    GameID INT  NOT NULL,
    commentText TEXT NOT NULL,
    PRIMARY KEY (commentID),
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (GameID) REFERENCES games(GameID)
); 
create database hosting_db