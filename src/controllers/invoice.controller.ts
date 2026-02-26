import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import { ValidationError } from "@utils/ApiError.js";

import { createCalendarEventSchema, updateCalendarEventSchema } from "@/schemas/calendarEvent.schema";

import Invoice from "@models/Invoice.js";

interface CreateInvoiceRequestBody {
  billingDate: Date;
  amount: number;
  description: string;
  petRecordId: string;
}

interface UpdateInvoiceRequestBody extends CreateInvoiceRequestBody {
  id: string;
  createdAt: Date;
}

const invoiceController = {
  findAllWithPetRecordId: (async (req: Request<{ petRecordId: string }>, res: Response, next: NextFunction) => {
    try {
      const { petRecordId } = req.params;
      // @ts-ignore
      const invoices = await Invoice.findAll({
        where: { petRecordId: petRecordId },
        order: [["billingDate", "DESC"]],
      });

      return res.status(StatusCodes.OK).json(invoices);
    } catch (error) {
      next(error);
    }
  }) as unknown as RequestHandler,

  create: (async (req: Request<{ petRecordId: string }, object, CreateInvoiceRequestBody>, res: Response, next: NextFunction) => {
    try {
      if (!(await createCalendarEventSchema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      const invoice = await Invoice.create(req.body);

      return res.status(StatusCodes.OK).json(invoice);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string }, object, CreateInvoiceRequestBody>,

  update: (async (req: Request<{ petRecordId: string; invoiceId: string }, object, UpdateInvoiceRequestBody>, res: Response, next: NextFunction) => {
    try {
      if (!(await updateCalendarEventSchema.isValid(req.body))) throw new ValidationError();

      // @ts-ignore
      await Invoice.update(req.body, { where: { id: req.params.invoiceId } });

      // @ts-ignore
      const updatedInvoice = await Invoice.findByPk(req.params.invoiceId);

      return res.status(StatusCodes.OK).json(updatedInvoice);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string; invoiceId: string }, object, UpdateInvoiceRequestBody>,

  delete: (async (req: Request<{ petRecordId: string; invoiceId: string }>, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      await Invoice.destroy({ where: { id: req.params.invoiceId } });

      return res.status(StatusCodes.OK).json({ msg: "Deleted" });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler<{ petRecordId: string; invoiceId: string }>,
};

export default invoiceController;
