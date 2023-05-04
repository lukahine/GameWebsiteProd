use hosting_db;

-- SETUP CREATE

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

CREATE TABLE games (
	GameID INT  NOT NULL AUTO_INCREMENT,
    GameName varchar(256) NOT NULL,
    GameDescription varchar(500) NOT NULL,
	url varchar(256) NOT NULL,
    PRIMARY KEY (GameID)
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

-- INSERT
INSERT INTO permissions (permissionName, permissionAdd, permissionEdit) VALUES ('admin', true, true);
INSERT INTO permissions (permissionName, permissionAdd, permissionEdit) VALUES ('user', false, false);

INSERT INTO games (GameID, GameName, GameDescription, url) VALUES (
    NULL,
  'Lucky Break',
  'Dodge or destroy Lady Lucks falling dice. Getting hit by one will lower your health by the number on it, but jumping on top of one will heal you by that same amount, and net you some extra points based on the risk! But be careful, Lady Luck randomly changes your speed, jump height, starting health, and the difficulty of the level every round! Made by Cooper Ott.'
  'https://v6p9d9t4.ssl.hwcdn.net/html/6227312/index.html'
);

INSERT INTO games (GameID, GameName, GameDescription, url) VALUES (
    NULL,
  'Sort the Court!',
  'Give your decree in simple yes or no answers, and help the kingdom grow! Made by Graeme Borland'
  'https://v6p9d9t4.ssl.hwcdn.net/html/347310/index.html?v=1542780889'
);

create database hosting_db