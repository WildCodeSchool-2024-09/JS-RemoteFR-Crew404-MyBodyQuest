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
  size DECIMAL(5,2) NOT NULL,
  objective VARCHAR(50) NOT NULL,
  initial_weight DECIMAL(5,2) NOT NULL,
  desired_weight DECIMAL(5,2) NOT NULL,
  weight_frequency VARCHAR(50) NOT NULL,
  current_xp INT DEFAULT 1 NOT NULL,
  level_id INT UNSIGNED,
  FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE tracking (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  date DATE NOT NULL,
  mesure_size DECIMAL(5,2) DEFAULT NULL,
  mesure_chest DECIMAL(5,2) DEFAULT NULL,
  mesure_breast DECIMAL(5,2) DEFAULT NULL,
  mesure_buttocks DECIMAL(5,2) DEFAULT NULL,
  mesure_hips DECIMAL(5,2) DEFAULT NULL,
  mesure_calves DECIMAL(5,2) DEFAULT NULL,
  weight DECIMAL(5,2) DEFAULT NULL,
  comments TEXT DEFAULT NULL,
  user_id INT UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE success (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  success_title VARCHAR(50) NOT NULL,
  success_img VARCHAR(255) DEFAULT NULL
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

INSERT INTO levels (xp_max)
 VALUES ('80');

INSERT INTO users 
(firstname, lastname, avatar, email, password, birthday_date, size, objective, initial_weight, desired_weight, weight_frequency, current_xp, level_id)
  VALUES
  ('john', 'doe', '', 'johndoe@gmail.com', 'john1999', '1999-01-01', '180', 'perte', '85', '80', '1 fois par semaine', '200', '1' );

INSERT INTO tracking (date,weight,comments,user_id)
 VALUES ('2025-01-08','83.70','Test','1');

INSERT INTO success (success_title)
VALUES ('Inscription sur le site réussie 💪'), ('Explorateur des quêtes running '), ('Aventurier des quêtes running'), ('Vétéran des quêtes running'), ('Explorateur des quêtes fitness'), ('Aventurier des quêtes fitness'), ('Vétéran des quêtes fitness'), ('Sorties en folie'), ('Anti courbatures'), ('Bien dans son corps'), ('La nourriture c''est la vie');

INSERT INTO category (name, success_id)
VALUES ('Running lvl1', '2'), ('Running lvl2', '3'), ('Running lvl3', '4'), ('Fitness lvl1', '5'), ('Fitness lvl2', '6'), ('Fitness lvl3', '7'), ('Autres activités sportives', '8'), ('Echauffements et étirements', '9'), ('Activités bien-être', '10'), ('Alimentation', '11');

INSERT INTO quests (quest_title, description, xp, category_id)
VALUES ('Première connexion', 'Félicitations, tu as débloqué ta première quête! Valide en d''autres afin d''atteindre le prochain niveau!','10', '1');

INSERT INTO user_quests (user_id, quest_id, is_done)
VALUES ('1', '1', TRUE);

-- SQLBook: Code
