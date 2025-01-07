-- SQLBook: Code
CREATE TABLE levels (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  xp_max INT NOT NULL
);

CREATE TABLE users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  avatar VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(15) NOT NULL,
  birthday_date DATE DEFAULT NULL,
  size DECIMAL,
  objective VARCHAR(50) NOT NULL,
  initial_weight DECIMAL,
  desired_weight DECIMAL,
  weight_frequency DECIMAL,
  current_xp INT NOT NULL,
  level_id INT UNSIGNED,
  FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE tracking (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  date DATE NOT NULL,
  mesure_size DECIMAL DEFAULT NULL,
  mesure_chest DECIMAL DEFAULT NULL,
  mesure_breast DECIMAL DEFAULT NULL,
  mesure_buttocks DECIMAL DEFAULT NULL,
  mesure_hips DECIMAL DEFAULT NULL,
  mesure_calves DECIMAL DEFAULT NULL,
  weight DECIMAL DEFAULT NULL,
  comments TEXT DEFAULT NULL,
  user_id INT UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE success (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  success_title VARCHAR(50) NOT NULL,
  success_img VARCHAR(255)
);

CREATE TABLE category (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  success_id INT UNSIGNED,
  FOREIGN KEY (success_id) REFERENCES success(id)
);

CREATE TABLE quests (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quest_title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  xp INT NOT NULL,
  category_id INT UNSIGNED,
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE user_quests (
  user_id INT UNSIGNED,
  quest_id INT UNSIGNED,
  is_done BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, quest_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (quest_id) REFERENCES quests(id)
);
