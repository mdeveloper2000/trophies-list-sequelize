CREATE TABLE games (
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    gametitle VARCHAR(50) NOT NULL,
    gameyear INT UNSIGNED NOT NULL,
    multiplayer ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    platinum ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    details VARCHAR(255),
    PRIMARY KEY(id)
);