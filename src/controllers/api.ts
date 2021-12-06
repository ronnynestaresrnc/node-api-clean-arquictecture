import { throws } from "assert";
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
  app.put("/courses/:id", async (req: Request, response: Response) => {
    const id = parseInt(req.params.id);

    const { nombre, duracion, tutor, valoracion, precio, idespecialidad } =
      req.body;
    parseInt(valoracion);
    parseInt(precio);
    parseInt(idespecialidad);

    try {
      const res = await client.query(
        "UPDATE  courses set nombre = $2 , tutor = $3, duracion = $4 ,valoracion =$5,precio =$6, idespecialidad =$7 WHERE id = $1",
        [id, nombre, tutor, duracion, valoracion, precio, idespecialidad]
      );
      console.log(res.rows);
      response.status(200).json({ message: "editado correctamente" });
    } catch (error) {
      console.log(error);
    }
  });
  app.get("/courses/:id", async (req: Request, response: Response) => {
    const id = parseInt(req.params.id);
    try {
      const res = await client.query("SELECT * FROM courses WHERE id = $1", [
        id,
      ]);
      console.log(res.rows);
      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });
  app.delete("/courses/:id", async (req: Request, response: Response) => {
    const id = parseInt(req.params.id);
    try {
      const res = await client.query("DELETE  FROM courses WHERE id = $1", [
        id,
      ]);
      console.log(res.rows);
      response.status(200).json({ message: "course eliminado correctamente" });
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/especialidades/", async (req: Request, response: Response) => {
    try {
      const res = await client.query("SELECT * FROM especialidad ");
      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });
  app.post("/auth", async (req: Request, response: Response) => {
    const { user, pass } = req.body;
    const query = {
      name: "fetch-user",
      text: "SELECT * FROM users WHERE usuario LIKE  $1 ",
      values: [user],
    };

    try {
      const res = await client.query(query);
      if (res.rowCount == 0) return response.json({ message: "0" });
      if (res.rows[0].pass !== pass) return response.json({ message: "-1" });
      return response.json({ message: "2", res: res.rows[0] });
    } catch (e) {
      throws;
    }
  });
  app.post("/add", async (req: Request, response: Response) => {
    const { nombre, tutor, duracion, valoracion, precio, idespecialidad } =
      req.body;
    const query = {
      name: "fetch-user",
      text: "insert into courses(nombre,tutor,duracion,valoracion,precio,idespecialidad) values($1,$2,$3,$4,$5,$6)",
      values: [nombre, tutor, duracion, valoracion, precio, idespecialidad],
    };

    try {
      const res = await client.query(query);

      return response.json({ message: "agregado" });
    } catch (e) {
      throws;
    }
  });
};
