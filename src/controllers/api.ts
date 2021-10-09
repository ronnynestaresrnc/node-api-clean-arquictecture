import { Application, Request, Response } from "express";
import { Client } from "pg";

import CoursesData from "../../data/courses.json";

const client = new Client({
  user: "kvwnnbklxemlfr",
  host: "ec2-107-20-24-247.compute-1.amazonaws.com",
  database: "de1kesrte1ut12",
  password: "ff48c62309c32a67e629c5a90b09724832775467e2dfe8fd051b59062a315e83",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

export const loadApiEndpoints = (app: Application): void => {
  app.get("/autos", async (req: Request, response: Response) => {
    try {
      const res = await client.query("SELECT * FROM autos ");

      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });
  app.get("/autos/:id", async (req: Request, response: Response) => {
    const id = parseInt(req.params.id);
    try {
      const res = await client.query("SELECT * FROM autos WHERE id = $1", [id]);
      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });
};
