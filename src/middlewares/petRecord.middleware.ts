import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { BadRequestError } from "@utils/ApiError.js";

import PetRecord from "@models/PetRecord.js";
import UserPetRecord from "@models/UserPetRecord.js";

export async function petRecordMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const petRecordId = req.params.petRecordId || req.body.petRecordId;
    const userId = req.userId;

    if (!petRecordId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad request: petRecordId missing" });
    }
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized: userId missing" });
    }

    // @ts-ignore
    const petRecord = await PetRecord.findByPk(petRecordId);
    if (!petRecord) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Not found: petRecord not found" });
    }

    // @ts-ignore
    const userPetRecord = await UserPetRecord.findOne({ where: { userId, petRecordId } });
    if (!userPetRecord) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden: petRecord does not belong to user" });
    }

    req.petRecordId = petRecordId;

    next();
  } catch {
    next(new BadRequestError());
  }
}
