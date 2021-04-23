import { Request, Response } from "express";
// import { Request, Response } from "express";
import Excel from "exceljs";

interface RequestWithBody extends Request {
  body: { array: [] };
}

function calculateTotal(
  columnLetter: string,
  firstDataRow: number,
  lastDataRow: number
) {
  const firstCellReference = `${columnLetter}${firstDataRow}`;
  const lastCellReference = `${columnLetter}${lastDataRow}`;
  const sumRange = `${firstCellReference}:${lastCellReference}`;

  return {
    formula: `SUM(${sumRange})`,
  };
}

export const generateSalesReport = async (
  req: RequestWithBody,
  res: Response
) => {
  //sample input
  //{"arrray":
  //  [
  //   { product: "Product A", week1: 5, week2: 10, week3: 27 },
  //   { product: "Product B", week1: 5, week2: 5, week3: 11 },
  //   { product: "Product C", week1: 1, week2: 2, week3: 3 },
  //   { product: "Product D", week1: 6, week2: 1, week3: 2 },
  // ];
  //}

  const workbook = new Excel.Workbook(); //Create new Excel file
  const worksheet = workbook.addWorksheet("Sales Data"); //Add sheet

  //get the last editable
  // const lastRow = worksheet.lastRow;
  // console.log(typeof lastRow);
  // console.log(lastRow)

  worksheet.mergeCells("A1:H3");
  worksheet.getCell("A1").value = "REVENUE";

  //styles
  worksheet.getCell("A1").font = { size: 20, bold: true };
  worksheet.getCell("A1").alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  // let row4Values = ["Product Name", "Week 1", "Week 2", "Week 3"];
  let row4Values = [];
  row4Values[2] = "Product Name";
  row4Values[3] = "Week 1";
  row4Values[4] = "Week 2";
  row4Values[5] = "Week 3";
  worksheet.getRow(4).values = row4Values;

  //styles
  worksheet.columns = [
    { width: 20 },
    { key: "product", width: 20 },
    { key: "week1", width: 20 },
    { key: "week2", width: 20 },
    { key: "week3", width: 20 },
  ];

  // worksheet.columns.forEach((column) => {
  //   column.border = {
  //     top: { style: "thin" },
  //     left: { style: "thin" },
  //     bottom: { style: "thin" },
  //     right: { style: "thin" },
  //   };
  // });

  // worksheet.columns = [
  //   {
  //     header: "Product Name",
  //     key: "product",
  //     width: 20,
  //   },
  //   { header: "Week 1", key: "week1", width: 10 },
  //   { header: "Week 2", key: "week2", width: 10 },
  //   { header: "Week 3", key: "week3", width: 10 },
  // ];

  const inputData = req.body.array;
  worksheet.addRows(inputData);

  // inputData.forEach((data) => {
  //   worksheet.addRow(data);
  // });

  worksheet.getRow(4).eachCell((cell) => {
    cell.border = {
      top: { style: "thick" },
      left: { style: "thick" },
      bottom: { style: "thick" },
      right: { style: "thick" },
    };
    cell.font = { size: 16, bold: true, color: { argb: "FF0000" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
  });

  worksheet.views = [{ activeCell: "B5" }];
  //await workbook.xlsx.writeFile("excel.xlsx");

  //auto filter
  worksheet.autoFilter = {
    from: "B4",
    to: { row: worksheet.rowCount, column: 5 },
  };

  worksheet.addRow([
    undefined,
    "Total",
    calculateTotal("C", 5, worksheet.rowCount),
    calculateTotal("D", 5, worksheet.rowCount),
    calculateTotal("E", 5, worksheet.rowCount),
  ]);

  //buffer
  const buffer = await workbook.xlsx.writeBuffer();

  res.attachment("excelSample.xlsx");
  res.send(buffer);
};
