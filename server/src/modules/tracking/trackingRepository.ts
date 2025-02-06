import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Tracking = {
  id: number;
  entryDate: Date;
  waistline: number;
  chestMeasurement: number;
  thighCircumference: number;
  buttocksCircumference: number;
  hipCircumference: number;
  calfCircumference: number;
  weight: number;
  comments: string;
  user_id: number;
};

class TrackingRepository {
  // The C of CRUD - Create operation

  async create(tracking: Omit<Tracking, "id">) {
    // Execute the SQL INSERT query to add a new tracking to the "tracking" table
    const [result] = await databaseClient.query<Result>(
      "insert into tracking (entryDate, waistline, chestMeasurement, thighCircumference,buttocksCircumference, hipCircumference, calfCircumference, weight, comments,user_id) values (?, ?,?,?,?,?,?,?,?,?)",
      [
        tracking.entryDate,
        tracking.waistline ? tracking.waistline : null,
        tracking.chestMeasurement ? tracking.chestMeasurement : null,
        tracking.thighCircumference ? tracking.thighCircumference : null,
        tracking.buttocksCircumference ? tracking.buttocksCircumference : null,
        tracking.hipCircumference ? tracking.hipCircumference : null,
        tracking.calfCircumference ? tracking.calfCircumference : null,
        tracking.weight ? tracking.weight : null,
        tracking.comments ? tracking.comments : null,
        tracking.user_id,
      ],
    );

    // Return the ID of the newly inserted tracking
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific tracking by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from tracking where user_id =?",
      [id],
    );

    // Return the first row of the result, which represents the tracking
    return rows as Tracking[];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all tracking from the "tracking" table
    const [rows] = await databaseClient.query<Rows>("select * from tracking");

    // Return the array of trackings
    return rows as Tracking[];
  }

  // The U of CRUD - Update operation
  async update(tracking: Tracking) {
    // Execute the SQL UPDATE query to update the tracking in the "tracking" table
    await databaseClient.query(
      "update tracking set entryDate = ?, waistline = ?, chestMeasurement = ?, thighCircumference = ?, buttocksCircumference = ?, hipCircumference = ?, calfCircumference = ?, weight = ?, comments = ?, user_id = ? where id = ?",
      [
        tracking.entryDate,
        tracking.waistline ? tracking.waistline : null,
        tracking.chestMeasurement ? tracking.chestMeasurement : null,
        tracking.thighCircumference ? tracking.thighCircumference : null,
        tracking.buttocksCircumference ? tracking.buttocksCircumference : null,
        tracking.hipCircumference ? tracking.hipCircumference : null,
        tracking.calfCircumference ? tracking.calfCircumference : null,
        tracking.weight ? tracking.weight : null,
        tracking.comments ? tracking.comments : null,
        tracking.user_id,
        tracking.id,
      ],
    );
    return tracking.id;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to remove the tracking from the "tracking" table
    const [result] = await databaseClient.query<Result>(
      "delete from tracking where id = ?",
      [id],
    );
    return result.affectedRows > 0;
  }
}

export default new TrackingRepository();
