"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSalesReport = void 0;
// import { Request, Response } from "express";
var exceljs_1 = __importDefault(require("exceljs"));
function calculateTotal(columnLetter, firstDataRow, lastDataRow) {
    var firstCellReference = "" + columnLetter + firstDataRow;
    var lastCellReference = "" + columnLetter + lastDataRow;
    var sumRange = firstCellReference + ":" + lastCellReference;
    return {
        formula: "SUM(" + sumRange + ")",
    };
}
var generateSalesReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var workbook, worksheet, base64Image1, imageId1, row4Values, inputData, buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                workbook = new exceljs_1.default.Workbook();
                worksheet = workbook.addWorksheet("Sales Data");
                base64Image1 = "iVBORw0KGgoAAAANSUhEUgAABLAAAAMgCAMAAAAEPmswAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC7lBMVEXaJR3gSRjgSBjskQ/skA/42AX41wXfQhn//wDfRBnriw/rihD30gb30QbePhr//gDePxnqhhDqhRD2zQf2zAfdOhr//QDeOxrqgBHpgBH2xwf1xwjdNhv+/AD//ADdOBrpexLpehL1wgj1wQjcMxv++gH++wHdNBvodhLodRL0vQn0vAncLxz++AH++QHcMRvncRPncBPzuAnztwrbLhz99gH+9gHcLhzmbBTmaxTyswrysgrbKxz98wL99AHbLBzlZhTlZRTxrQvxrAvbKRz88AL98QLbKhzkYRXkYBXwqAzwpwzaKB387AL87gLbKB3jXBbjWxbvowzvogzaJh375wP76APaJx3iVxbiVhfung3unQ364gT65ATiURfhURfumA7tmA753gT63wThTBjhSxjtkw7tkg752gX52QXgRRngRxjsjg/sjQ/41Qb41AbfQRnfQxnriRDriBD30Ab3zwbePBrqhBDqgxD2ywf2ygfdORreOhrpfxHpfhH1xgj1xQjdNRvoeRLoeBL0wAj0vwncMhvcNBvndBPncxPzuwnzugn+9wHmbxPmbhPztQrytQr99QHbLRzmaRTlaRTysAryrwv98ALlZBXlYxXxqwvxqgv87QL87wLkXxXkXhXwpgzwpQz76gP86wPjWhbjWRbvoQ3voA375QPiVBfiUxfumw3umg364QT64wThTxfhThjtlg7tlQ753QX53wTgShjfRRngRhnrjA/30wbfQBnrhhD3zQfqgRH2yAfpfBH1wwjodxL0vgncMBznchPzuQnmbRPytArlZxTxrgvkYhXwqQvjXRbvpAz76QP86gPjVxbvng3iUhfumQ7hTRjtlA752wXsjw/41gXePRrePxrdNxvoehL0wQjndRL0uwnnbxPztgrmahTysQr98gL75gPiVRfunA3hUBftlw7kYxX42QXlaBTjWBbgSxj1xAjkXRX53AX2yQfxrwvwqgvwpAzvnw364ATskg////9TexiJAAAAAWJLR0T5TGRX8AAAAAd0SU1FB+EICgIXBE9rXcMAABaYSURBVHja7d35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";
                imageId1 = workbook.addImage({
                    base64: base64Image1,
                    extension: "png",
                });
                worksheet.addImage(imageId1, "A1:A3");
                worksheet.addImage(imageId1, "F1:H3");
                //get the last editable
                // const lastRow = worksheet.lastRow;
                // console.log(typeof lastRow);
                // console.log(lastRow)
                worksheet.mergeCells("A1:H3");
                worksheet.getCell("B1").value = "REVENUE";
                //styles
                worksheet.getCell("B1").font = { size: 20, bold: true };
                worksheet.getCell("B1").alignment = {
                    vertical: "middle",
                    horizontal: "center",
                };
                row4Values = [];
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
                inputData = req.body.array;
                worksheet.addRows(inputData);
                // inputData.forEach((data) => {
                //   worksheet.addRow(data);
                // });
                worksheet.getRow(4).eachCell(function (cell) {
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
                return [4 /*yield*/, workbook.xlsx.writeBuffer()];
            case 1:
                buffer = _a.sent();
                res.attachment("excelSample.xlsx");
                res.send(buffer);
                return [2 /*return*/];
        }
    });
}); };
exports.generateSalesReport = generateSalesReport;
