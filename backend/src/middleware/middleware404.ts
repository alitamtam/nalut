import { Request, Response } from 'express';

interface CustomRequest extends Request {}
interface CustomResponse extends Response {}

const middleware404 = (req: CustomRequest, res: CustomResponse) => {
  res.status(404).render("notFound");
};


export default middleware404;