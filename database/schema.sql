CREATE TABLE `users` (
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(40) NOT NULL,
  name VARCHAR(255),
  last_name VARCHAR(255),
  image VARCHAR(255)
)