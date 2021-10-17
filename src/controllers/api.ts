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

  app.get("/autos/categoria/:id", async (req: Request, response: Response) => {
    const id = parseInt(req.params.id);
    try {
      const res = await client.query(
        "SELECT * from autos  WHERE idcategoria = $1",
        [id]
      );
      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/categorias", async (req: Request, response: Response) => {
    try {
      const res = await client.query("SELECT * FROM categoria ");

      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/courses/", async (req: Request, response: Response) => {
    try {
      const res = await client.query("SELECT * FROM courses");

      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get(
    "/courses/especialidad/:id",
    async (req: Request, response: Response) => {
      const id = parseInt(req.params.id);
      try {
        const res = await client.query(
          "SELECT * FROM courses WHERE idespecialidad = $1",
          [id]
        );
        response.status(200).json(res.rows);
      } catch (error) {
        console.log(error);
      }
    }
  );

  app.get("/especialidades/", async (req: Request, response: Response) => {
    try {
      const res = await client.query("SELECT * FROM especialidad ");
      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });
  app.post("/add/", async (req: Request, response: Response) => {
    const { nombre, duracion, tutor, valoracion, precio, idespecialidad } =
      req.body;
    console.log(req.body);
    try {
      const res = await client.query(
        "INSERT INTO courses (nombre,duracion, tutor,valoracion,precio,idespecialidad) VALUES ($1, $2,$3,$4,$5,$6) RETURNING id",
        [nombre, duracion, tutor, valoracion, precio, idespecialidad]
      );
      const { rows } = await res;
      console.log(rows);
      const { id } = rows[0];
      response.status(201).send(`User added with ID: ${id}`);
    } catch (error) {
      console.log(error);
    }
  });
};
