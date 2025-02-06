import type { RequestHandler } from "express";

import userQuestRepository from "./userSuccessRepository";

//liste des quêtes validées par un utilisateur pour une catégorie
const browse: RequestHandler = async (req, res, next) => {
  try {
    const { user_id, category_id } = req.body;
    const userSuccess = await userQuestRepository.getCompletedQuestsByCategory(
      user_id,
      category_id,
    );

    res.json(userSuccess);
  } catch (err) {
    next(err);
  }
};

//récupérer les infos d'une catégortie de quête
const read: RequestHandler = async (req, res, next) => {
  try {
    const questId: number = Number(req.params.id);
    const quest = await userQuestRepository.getTotalQuestsByCategory(questId);

    if (!quest) {
      res.sendStatus(404);
    } else {
      res.json(quest);
    }
  } catch (err) {
    next(err);
  }
};

//vérifier si toutes les quêtes d'une catégorie ont été validées, attribuer un succès

const verifyCategories: RequestHandler = async (req, res, next) => {
  try {
    const { user_id, category_id } = req.body;
    const totalQuests =
      await userQuestRepository.getTotalQuestsByCategory(category_id);
    const completedQuests =
      await userQuestRepository.getCompletedQuestsByCategory(
        user_id,
        category_id,
      );
    const success_id =
      await userQuestRepository.getSuccessIdByCategory(category_id);

    if (
      totalQuests.length === completedQuests.length &&
      !(await userQuestRepository.checkUserSuccess(user_id, success_id))
    ) {
      await userQuestRepository.createUserSuccess(user_id, success_id);
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, verifyCategories };
