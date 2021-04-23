import { Request, Response } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

export const func1 = (req: RequestWithBody, res: Response) => {
  // res.send(
  //   '<form method="POST"><div><label>Email</label><input name=email></input></div></form>'
  // );
  res.status(200).json({ a: "n" });
};
