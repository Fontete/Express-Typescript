import { Request, Response } from "express";
// import { Request, Response } from "express";
import Excel from "exceljs";

interface RequestWithBody extends Request {
  body: { array: [] };
}

export const generateSalesReport = async (
  req: RequestWithBody,
  res: Response
) => {
  //  [
  //   { product: "Product A", week1: 5, week2: 10, week3: 27 },
  //   { product: "Product B", week1: 5, week2: 5, week3: 11 },
  //   { product: "Product C", week1: 1, week2: 2, week3: 3 },
  //   { product: "Product D", week1: 6, week2: 1, week3: 2 },
  // ];
  const workbook = new Excel.Workbook(); //Create new Excel file
  const worksheet = workbook.addWorksheet("Sales Data"); //Add sheet
  worksheet.columns = [
    { header: "Product ID", key: "product", width: 20 },
    { header: "Week 1", key: "week1", width: 10 },
    { header: "Week 2", key: "week2", width: 10 },
    { header: "Week 3", key: "week3", width: 10 },
  ];

  worksheet.addRows(req.body.array);

  worksheet.views = [
    { state: "frozen", xSplit: 1, ySplit: 1, activeCell: "B2" },
  ];
  //await workbook.xlsx.writeFile("excel.xlsx");

  const buffer = await workbook.xlsx.writeBuffer();

  res.attachment("excel.xlsx");
  res.send(buffer);
};
