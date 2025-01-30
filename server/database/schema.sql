-- SQLBook: Code
CREATE TABLE levels (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  xp_max INT NOT NULL
);

CREATE TABLE users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  sexe ENUM('Masculin', 'Féminin') DEFAULT NULL,
  avatar VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  birthday_date DATE,
  size DECIMAL(5,2) NOT NULL,
  objective VARCHAR(50) NOT NULL,
  initial_weight DECIMAL(5,2) NOT NULL,
  desired_weight DECIMAL(5,2) NOT NULL,
  weight_frequency VARCHAR(50) NOT NULL,
  current_xp INT DEFAULT 200 NOT NULL,
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
(firstname, lastname, sexe, avatar, email, password, birthday_date, size, objective, initial_weight, desired_weight, weight_frequency, current_xp, level_id)
  VALUES
  ('john', 'doe', 'Masculin', '', 'johndoe@gmail.com', 'john1999', '1999-01-01', '180', 'perte', '85', '80', '1 fois par semaine', '200', '1' );

INSERT INTO tracking (date,weight,comments,user_id)
 VALUES ('2025-01-08','83.70','Test','1');

INSERT INTO success (success_title)
VALUES ('Inscription sur le site réussie 💪'), 
('Explorateur des quêtes running '), 
('Aventurier des quêtes running'), 
('Vétéran des quêtes running'), 
('Explorateur des quêtes fitness'), 
('Aventurier des quêtes fitness'), 
('Vétéran des quêtes fitness'), 
('Sorties en folie'), 
('Anti courbatures'), 
('Bien dans son corps'), 
('La nourriture c''est la vie');

INSERT INTO category (name, success_id)
VALUES ('Running lvl1', '2'), 
('Running lvl2', '3'), 
('Running lvl3', '4'), 
('Fitness lvl1', '5'), 
('Fitness lvl2', '6'), 
('Fitness lvl3', '7'), 
('Autres activités sportives', '8'), 
('Echauffements et étirements', '9'), 
('Activités bien-être', '10'), 
('Alimentation', '11'),
('Divers', '1');

INSERT INTO quests (quest_title, description, xp, category_id)
VALUES ('Première connexion', 'Félicitations, tu t''es connecté pour la première fois!', '10', '11'),
('Marche lvl1', 'Marcher 30 min, 1jour/2, pendant 2 semaines à allure modérée', '5', '1'),
('Marche lvl1', 'Marcher 30 min/jour pendant 2 semaines à allure modérée', '10', '1'),
('Marche  lvl1', 'Marcher 45 min/jour pendant 2 semaines à allure modérée', '10', '1'),
('Marche  lvl1', 'Marcher 1h/jour pendant 2 semaines à allure modérée', '15', '1'),
('Course lvl1', 'Courir 1fois/mois pendant 3 mois (10 min)', '5', '1'),
('Course lvl1', 'Courir 2fois/mois pendant 3 mois (10 min)', '10', '1'),

('Marche  lvl2', 'Marcher 30min, 1jour/2, pendant 2 semaines à allure rapide', '15', '2'),
('Marche  lvl2', 'Marcher 30min/jour, pendant 2 semaines à allure rapide', '20', '2'),
('Marche  lvl2', 'Marcher 45min/jour, pendant 1 mois à allure rapide', '25', '2'),
('Course lvl2', 'Courir 2fois/mois pendant 3 mois (15 min)', '10', '2'),
('Course lvl2', 'Courir 1fois/semaine pendant 3 mois (15 min)', '15', '2'),
('Course lvl2', 'Courir 1fois/semaine pendant 3 mois (20 min)', '20', '2'),

('Marche lvl3', 'Marcher 1h/jour pendant 3 mois à allure rapide', '25', '3'),
('Marche lvl3', 'Marcher 1h/jour pendant 6 mois à allure rapide', '50', '3'),
('Marche Nordique', 'Effectuer une séance de 1h de marche nordique, 1fois/semaine pendant 3 mois (avec échauffements et étirements)', '25', '3'),
('Marche Nordique', 'Effectuer une séance de 1h de marche nordique, 2fois/semaine pendant 6 mois (avec échauffements et étirements)', '50', '3'),
('Course lvl3', 'Courir 1fois/semaine pendant 3 mois (30 min)', '25', '3'),
('Course lvl3', 'Courir 1fois/semaine pendant 3 mois (40 min)', '25', '3'),
('Course lvl3', 'Courir 2fois/semaine pendant 3 mois (40 min)', '50', '3'),

('Cardio lvl1', 'Réaliser le circuit: 30s de Burpees, 30s de Fentes alternées, 30s de Jumping jack. Avec 20s de repos entre chaque exercice', '5', '4'),
('Cardio lvl1', 'Réaliser 2fois le circuit: 30s de Burpees, 30s de Fentes alternées, 30s de Jumping jack. Avec 20s de repos entre chaque exercice et 1min entre les circuits', '10', '4'),
('Gainage lvl1', 'Réaliser le circuit: 30s de Planche sur les genoux, 30s Planche latérale droite et 30s gauche.  Avec 20s de repos entre chaque exercice', '5', '4'),
('Gainage lvl1', 'Réaliser 2fois le circuit: 30s de Planche sur les genoux, 30s Planche latérale droite et 30s gauche.  Avec 10s de repos entre chaque exercice et 1min entre les circuits', '10', '4'),
('Renforcement lvl1', 'Réaliser le circuit: 30s de Relevé bassin, 30s de Lever de jambe latérale droite et 30s gauche. Avec 30s de repos entre chaque exercice', '5', '4'),
('Renforcement lvl1', 'Réaliser 2fois le circuit: 30s de Relevé bassin, 30s de Lever de jambe latérale droite et 30s gauche. Avec 30s de repos entre chaque exercice et 1min entre les circuits', '10', '4'),

('Cardio lvl2', 'Réaliser 2fois le circuit: 30s de Burpees, 30s de Fentes alternées, 30s de Squats sautés, 30s de Jumping jack. Avec 20s de repos entre chaque exercice et 1min entre les circuits', '15', '5' ),
('Gainage lvl2', 'Réaliser 2fois le circuit: 30s de Planche, 30s Planche latérale droite et 30s gauche, 30s de Gainage dos.  Avec 10s de repos entre chaque exercice et 1min entre les circuits', '15', '5'),
('Gainage lvl2', 'Réaliser 2fois le circuit: 30s de planche, 30s de Planche latérale droite et 30s gauche, 30s de Relevés buste, 30s de Gainage dos.  Avec 10s de repos entre chaque exercice et 1min entre les circuits', '20', '5'),
('Renforcement lvl2', 'Réaliser 2fois le circuit: 30s de Relevé bassin, 30s de Lever de jambe latérale droite et 30s gauche. Avec 20s de repos entre chaque exercice et 1min entre les circuits', '10', '5'),
('Renforcement lvl2', 'Réaliser 2fois le circuit: 30s de Relevé bassin, 30s de Dips, 30s de Lever de jambe latérale droite et 30s gauche. Avec 20s de repos entre chaque exercice et 1min entre les circuits', '15', '5'),

('Cardio lvl3', 'Réaliser 1fois le circuit: 30s de Burpees, 30s de Corde à sauter, 30s de Mountains climber, 30s de Fentes alternées, 30s de Squats sautés, 30s de Jumping jack. Avec 20s de repos entre chaque exercice', '20', '6'),
('Cardio lvl3', 'Réaliser 2fois le circuit: 30s de Burpees, 30s de Corde à sauter, 30s de Mountains climber, 30s de Fentes alternées, 30s de Squats sautés, 30s de Jumping jack. Avec 20s de repos entre chaque exercice et 1min entre les circuits', '40', '6'),
('Gainage lvl3', 'Réaliser 2fois le circuit: 30s de Planche, 30s de Planche latérale droite et 30s gauche, 30s de Relevé buste, 30s de Gainage dos, 30 Scrunch croisés.  Avec 10s de repos entre chaque exercice et 1min entre les circuits', '30', '6'),
('Renforcement lvl3', 'Réaliser le circuit: 30s de Relevé bassin, 30s de Dips, 30s de Lever de jambe latérale droite et 30s gauche, 30s de Squats. Avec 20s de repos entre chaque exercice', '20', '6'),
('Renforcement lvl3', 'Réaliser 2fois le circuit: 30s de Relevé bassin, 30s de Dips, 30s de Lever de jambe latérale droite et 30s gauche, 30s de Squats. Avec 20s de repos entre chaque exercice et 1min entre les circuits', '40', '6'),

('Promenade à vélo', 'Effectuer min 15km à vélo sur un weekend', '20', '7'),
('Entrainement à vélo 1', 'Faire 5km à vélo 2fois/semaine (min 6 mois)', '20', '7'),
('Entrainement à vélo 2', 'Faire 10km à vélo 2fois/semaine (min 6 mois)', '40', '7'),
('Natation 1', 'Effectuer une séance de natation 1fois/semaine (min 6 mois)', '20', '7'),
('Natation 2', 'Effectuer une séance de natation 2fois/semaine (min 6 mois)', '30', '7'),
('Natation 3', 'Effectuer une séance de natation 3fois/semaine (min 6 mois)', '40', '7'),
('Escalade 1', 'Faire au moins une séance d''escalade', '5', '7'),
('Escalade 2', 'Effectuer une séance d''escalade 1fois/semaine (min 6 mois)', '20', '7'),
('Escalade 3', 'Effectuer une séance d''escalade 2fois/semaine (min 6 mois)', '30', '7'),
('Accrobranche 1', 'Effectuer un parcours d''accrobranche vert et/ou bleu', '10', '7'),
('Accrobranche 2', 'Effectuer un parcours d''accrobranche rouge et/ou noir', '15', '7'),
('Tir à l''arc', 'Faire au moins une séance de tir à l''arc', '10', '7'),
('Bowling', 'Faire au moins une partie de Bowling', '10', '7'),
('Equitation', 'Faire une séance d''équitation ou une balade à cheval', '10', '7'),
('Détente en plein air 1', 'Faire une partie de Volley-ball', '5', '7'),
('Détente en plein air 2', 'Faire une partie de frisbee', '5', '7'),
('Détente en plein air 3', 'Faire un partie de pétanque', '5', '7' ),
('Weekend sports nautiques','Faire au moins 2 sports nautiques sur un weekend (surf, planche à voile, ski nautique, pédalo...)', '25', '7'),
('Vacances à la mer', 'Passer 1 semaine de vacances à la mer et pratiquer des activités nautiques', '40', '7'),
('Weekend à la montagne', 'Faire au moins 2 jours de ski ou snowboard', '20', '7'),
('Vacances à la montagne hiver', 'Passer 1 semaine de vacances à la montagne et faire du ski, du snowboard, des raquettes...', '40', '7'),
('Vacances à la montagne été', 'Passer 1 semaine de vacances à la montagne et faire une randonnée, du canyoning, de la luge d''été, de la trotinette de montagne...', '40', '7'),
('Weekend à la campagne', 'Effectuer une rando d''un weekend à la campagne', '20', '7'),
('Vacances à la campagne', 'Effectuer une rando d''une semaine en campagne', '40', '7'),
('Géocaching ou Course d''orientation', 'Essayer le Géocaching ou participer à une course d''orientation', '10', '7'),

('Circuit échauffement 1', 'Réaliser le circuit: 30s de Course sur place, 30s de Talons fesses, 30s de Montées de genoux. Avec 30s de repos entre chaque exercice', '5', '8'),
('Circuit échauffement 2', 'Réaliser le circuit: 30s de Course sur place, 30s de Jumping jack, 30s de Talons fesses, 30s de Montées de genoux. Avec 20s de repos entre chaque exercice', '5', '8'),
('Circuit échauffement 3', 'Réaliser le circuit: 30s de Course sur place, 30s de Jumping jack, 30s de Talons fesses, 30s de Montées de genoux. Avec 10s de repos entre chaque exercice', '10', '8'),
('Circuit échauffement 4', 'Réaliser le circuit: 30s de Course sur place, 30s de Fente latérale gauche et 30s droite, 30s de Jumping jack, 30s de Talons fesses, 30s de Montées de genoux. Avec 10s de repos entre chaque exercice', '10', '8'),
('Circuit échauffement 5', 'Réaliser 2 fois le circuit: 30s de Course sur place, 30s de Fente latérale gauche et 30s droite, 30s de Jumping jack, 30s de Talons fesses, 30s de Montées de genoux. Avec 10s de repos entre chaque exercice et 1min entre les circuits', '20', '8'),
('Etirement Petite boulle', 'Au sol, sur le dos, ramener les deux genoux à la poitrine, en gardant la tête au sol puis presser sur les genoux pour allonger la colonne vertébrale lors de l''expiration. Répeter 5 à 10fois', '5', '8'),
('Etirement Chat', 'À 4 pattes, faire le dos creux en regardant vers le plafond, allonger la nuque et sortir les fesses, puis revenir lentement en dos plat, enfin faire le dos rond en regardant le nombril. Répéter 1 à 2min', '5', '8'),
('Etirement Torsion', 'Au sol, sur le dos, placer les bras en croix, les paumes vers le ciel, les jambes décollées du sol et fléchies à 90°. Inspirer, et à l''expiration, laisser les genoux basculer délicatement au sol sur le côté droit. Répéter l''exercice à gauche. Maintenir la posture 30s de chaque côté', '5', '8'),
('Etirement Enroulé vertébral ou Test doigts sol', 'Se tenir droit puis baisser la tête, le dos, le bassin vers l''avant en laissant pendre les bras vers le sol, puis remonter doucement. Répéter jusqu''à 10fois quotidiennement', '5', '8'),
('Etirement Fessiers au sol', 'Au sol, sur le dos, les jambes fléchies. Poser l''extérieur de la cheville droite sur le genou gauche, puis passer la main droite entre les deux jambes pour rejoindre la main gauche. Enfin, ramener vers soi le genou gauche. Répéter de l''autre côté et maintenir 30s', '5', '8'),
('Etirement Fessiers sur chaise', 'Assis au bord de d''un canapé ou d''une chaise, dos droit et jambes pliées. Poser l''extérieur de la cheville droite sur le genoux gauche en gardant les deux fesses bien dans le fond de l''assise. Répéter de l''autre côté et maintenir 30s x2', '5', '8'),
('Etirement Poitrine', 'Debout, poser la main à plat sur un mur, à hauteur de l''épaule et bras tendu. Effectuer une pression sur le bras afin que le corps se dirige dans le sens opposé. Répéter de l''autre côté et maintenir 30s', '5', '8'),
('Etirement Abdos', 'Au sol, sur le ventre, poser les main au niveau des épaules. Relever la tête, puis les épaules et le buste. Maintenir 15 à 20s', '5', '8'),
('Etirement Quadriceps', 'Debout, contre un mur, attraper le pied droit et ramener le talon contre la fesse en gardant l''alignement genoux, hanche et épaule. Répéter 2fois et maintenir 30s', '5', '8'),
('Etirement Adducteurs', 'Assis au sol, jambes tendues écartées, les deux bras devant, la tête relâchée. Quand une légère tension est ressentie, maintenir la posture 30s et répétez 2 fois', '5', '8'),
('Etirement Biceps','Debout, le bras droit tendu devant soi, doigts vers le bas, ramener les doigts vers vous avec la main gauche. Répéter de l''autre côté et mantenir 30s x2', '5', '8'),
('Etirement Triceps', 'Debout, poser la main droite sur l''oreille droite et l''arrière de la nuque, placer la main gauche sur le coude droit et appuyer légèrement. Quand une petite tension à l''arrière du bras droit est ressentie, maintenir 30s et répéter de l''autre côté', '5', '8'),

('Respiration', ' Inspirer 2s et expirer 4s, puis augmenter progressivement jusqu''à 6s d''inspiration et 10s d''expiration', '5', '9'),
('Bains chauds', 'Passer un weekend aux thermes', '20', '9'),
('Spa', 'Faire une séance de 2h au spa', '15', '9'),
('Soin du visage', 'Effectuer un soin du visage', '5', '9'),
('Soin du corps 1', 'Effectuer un soin du corps (modelage)', '10', '9'),
('Soin du corps 2', 'Effectuer un soin du corps (pierres chaudes)', '10', '9'),
('Soin du corps 3', 'Effectuer un soin du corps (bain)', '15', '9'),
('Yoga débutant 1', 'Réaliser les postures: de l''enfant, du chien tête en bas, du guerrier II, de la pince puis Savasana. 2fois/semaine pendant 3 mois', '10', '9'),
('Yoga débutant 2', 'Réaliser les postures: de l''enfant, du chien tête en bas, de la montagne, du guerrier II, de l''arbre, de la pince puis Savasana. 2fois/semaine pendant 3 mois', '15', '9'),
('Yoga intermédiaire 1', 'Réaliser les postures: de la tête au genou, du chien museau levé, de l''aigle puis Savasana. 2 fois/semaine pendant 3mois', '20', '9'),
('Yoga intermédiaire 2', 'Réaliser les postures: de la tête au genou, du chien museau levé, de l''aigle, du cobra, de la charrue, de la chandelle puis Savasana. 2 fois/semaine pendant 3mois', '25', '9'),
('Yoga difficile 1', 'Réaliser les postures: du lotus, du danseur, de la roue, du poisson puis Savasana. 2 fois/semaine pendant 3mois', '30', '9'),
('Yoga difficile 2', 'Réaliser les postures: du lotus, du danseur, de la roue, du poisson, de l''équilibre sur la tête, du corbeau puis Savasana. 2 fois/semaine pendant 3mois', '35', '9');

INSERT INTO user_quests (user_id, quest_id, is_done)
VALUES ('1', '1', TRUE);

-- SQLBook: Code
