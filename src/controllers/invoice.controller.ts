import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

import { BadRequestError, ValidationError } from "@/utils/ApiError.js";

import Invoice from "@/models/Invoice.js";

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
                order: [
                    ['billingDate', 'DESC']
                ]
            });

            if (!invoices) throw new BadRequestError();

            return res.status(StatusCodes.OK).json(invoices);
        } catch (error) {
            next(error);
        }
    }) as unknown as RequestHandler,

    create: (async (
        req: Request<{ petRecordId: string }, {}, CreateInvoiceRequestBody>, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
            const schema = Yup.object().shape({
                billingDate: Yup.date().required(),
                amount: Yup.number().required(),
                description: Yup.string().nullable(),
                petRecordId: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body))) throw new ValidationError();

            // @ts-ignore
            const invoice = await Invoice.create(req.body as any);

            return res.status(StatusCodes.OK).json(invoice);
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string }, {}, CreateInvoiceRequestBody>,

    update: (async (
        req: Request<{ petRecordId: string, invoiceId: string }, {}, UpdateInvoiceRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const schema = Yup.object().shape({
                id: Yup.string().required(),
                billingDate: Yup.date().required(),
                amount: Yup.number().required(),
                description: Yup.string().nullable(),
                petRecordId: Yup.string().required(),
                createdAt: Yup.date().required(),
                updatedAt: Yup.date()
            });

            if (!(await schema.isValid(req.body))) throw new ValidationError();

            // // @ts-ignore
            // req.body.updatedAt = new Date();

            // @ts-ignore
            await Invoice.update(req.body, { where: { id: req.params.invoiceId } });

            // @ts-ignore
            const updatedInvoice = await Invoice.findByPk(req.params.invoiceId);

            if (!updatedInvoice) throw new BadRequestError();

            return res.status(StatusCodes.OK).json(updatedInvoice);
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string, invoiceId: string }, {}, UpdateInvoiceRequestBody>,

    delete: (async (
        req: Request<{ petRecordId: string, invoiceId: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // @ts-ignore
            await Invoice.destroy({ where: { id: req.params.invoiceId } });

            return res.status(StatusCodes.OK).json({ msg: "Deleted" });
        } catch (error) {
            next(error);
        }
    }) as RequestHandler<{ petRecordId: string, invoiceId: string }>,

};

export default invoiceController;