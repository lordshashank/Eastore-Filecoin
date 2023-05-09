import fs from "fs";
import chalk from "chalk";

import { execute } from "../../../utils/execute";

export const createCar = async (fileName) => {
  const log = console.log;
  try {
    // Create CAR
    // const nameFormat = fileName.replace(/ /g, "\\ ");
    // const uploadPathFormat = config.uploadPath.replace(/ /g, "\\ ");
    // const carPathFormat = config.carPath.replace(/ /g, "\\ ");
    const uploadPathFormat = `/${__dirname}/../uploads/${fileName}`;
    const carPathFormat = `/${__dirname}/../uploadsCar/${fileName}.car`;
    // const car = await execute(
    //   `generate-car --single -i ${uploadPathFormat}/${fileId}/${nameFormat} -o ${carPathFormat} -p ${uploadPathFormat}/${fileId}`
    // );
    const car = await execute(
      `generate-car --single -i ${uploadPathFormat} -o ${carPathFormat} -p ${uploadPathFormat}/${fileId}`
    );
    const jsonResponse = JSON.parse(car);
    // const carSize = await execute(
    //   `stat --format="%s" ${carPathFormat}/${jsonResponse["PieceCid"]}.car`
    // );
    const carSize = await execute(
      `stat --format="%s" ${carPathFormat}/${jsonResponse["PieceCid"]}.car`
    );
    // Create DB record
    const response = {
      id: fileId,
      payloadCid: jsonResponse["DataCid"],
      pieceCid: jsonResponse["PieceCid"],
      carSize: parseInt(carSize.trim()),
      pieceSize: jsonResponse["PieceSize"],
      fileStatus: "CAR Created",
    };

    // Remove Uploaded file
    fs.rmSync(uploadPathFormat, { recursive: true });
    // Remove car file from disk
    fs.rmSync(carPathFormat, {
      recursive: true,
    });
    return;
  } catch (error) {
    log(chalk.red("Error creating car: ") + error);
    return;
  }
};
