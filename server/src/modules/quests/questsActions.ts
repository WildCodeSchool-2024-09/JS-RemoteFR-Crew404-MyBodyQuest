import type { RequestHandler } from "express";

// Import access to data
import questsRepository from "./questsRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all Quests
    const quests = await questsRepository.readAll();

    // Respond with the Quests in JSON format
    res.json(quests);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific Quest based on the provided ID
    const questId = Number(req.params.id);
    const quest = await questsRepository.read(questId);

    // If the Quest is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the Quests in JSON format
    if (quest == null) {
      res.sendStatus(404);
    } else {
      res.json(quest);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Mettre à jour une quête
const edit: RequestHandler = async (req, res, next) => {
  try {
    const userQuestDone = {
      // Je récupère l'id de l'utilisateur via le token
      user_id: req.body.user.id,
      // le signe + est un alias pour rendre un string en number
      quest_id: +req.body.quest_id,
    };

    // Ici, je récupère les informations de mon user pour avoir les derniere MAJ
    const xpUser = await questsRepository.readUserXp(+req.body.user.id);
    // Ici, je récupere toute les informations de la quête
    const xpQuest = await questsRepository.read(+req.body.quest_id);

    // Si mon user a plus de 100 d'exp, je le lvl up,
    if (xpUser.current_xp + xpQuest.xp >= 100) {
      await questsRepository.updateLevelAndXP(
        xpUser.level + 1,
        xpUser.current_xp + xpQuest.xp - 100,
        req.body.user.id,
      );
    } else {
      // Sinon, j'update juste son current_xp
      await questsRepository.updateLevelAndXP(
        xpUser.level,
        xpUser.current_xp + xpQuest.xp,
        req.body.user.id,
      );
    }

    // Je met à jour la quête
    const editQuest = await questsRepository.updateQuestStatus(userQuestDone);

    // Je recupère les infos mises à jour
    const updateUserXp = await questsRepository.readUserXp(+req.body.user.id);

    // renvoi réponse avec infos à jour
    res.status(200).json({ editQuest, userXp: updateUserXp });
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
// Delete if no administrator has been added or created
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the Quest data from the request body
    const newQuest = {
      quest_title: req.body.quest_title,
      description: req.body.description,
      xp: req.body.xp,
      category_id: req.body.category_id,
    };

    // Create the Quest
    const insertId = await questsRepository.create(newQuest);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted Quest
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browseAllQuestDone: RequestHandler = async (req, res, next) => {
  if (!req.body.user) {
    res.status(401).json({ message: "Unautorized" });
    return;
  }

  try {
    const allQuestsDone = await questsRepository.getAllQuestsDone(
      req.body.user.id,
    );

    res.json(allQuestsDone);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, browseAllQuestDone };
