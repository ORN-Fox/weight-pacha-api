import { Request, Response, NextFunction } from "express";

import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from "@utils/ApiError.js";

import logger from "@/services/logger.service";

import PetRecord from "@models/PetRecord.js";
import UserPetRecord from "@models/UserPetRecord.js";

export async function petRecordMiddleware(req: Request, _res: Response, next: NextFunction) {
  try {
    const petRecordId: string = req.params.petRecordId || req.body.petRecordId;
    const userId = req.userId;

    if (!petRecordId) {
      logger.error("Bad request: petRecordId missing");
      next(new BadRequestError("Bad request: petRecordId missing"));
      return;
    }
    if (!userId) {
      logger.error("Unauthorized: userId missing");
      next(new UnauthorizedError("Unauthorized: userId missing"));
      return;
    }

    // @ts-ignore
    const petRecord = await PetRecord.findByPk(petRecordId);
    if (!petRecord) {
      logger.error("Not found: petRecord not found");
      next(new NotFoundError("Not found: petRecord not found"));
      return;
    }

    // @ts-ignore
    const userPetRecord = await UserPetRecord.findOne({ where: { userId, petRecordId } });
    if (!userPetRecord) {
      logger.error("Forbidden: petRecord does not belong to user");
      next(new ForbiddenError("Forbidden: petRecord does not belong to user"));
      return;
    }

    req.petRecordId = petRecordId;

    next();
  } catch (error) {
    logger.error(error);
    next(new BadRequestError());
  }
}
