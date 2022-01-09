import { Request, Response } from "express";

import { client } from "../../../config/db/";
import { Course } from "../../model/Course";

export async function createCourse(req: Request, res: Response) {
  const body = req.body;

  const course = new Course({
    name: body.name,
    tutor: body.tutor,
    duracion: body.duracion,
    valoracion: body.valoracion,
    precio: body.precio,
    idespecialidad: body.idespecialidad,
  });

  const { name, tutor, duracion, valoracion, precio, idespecialidad } = course;

  const query = {
    name: "fetch-user",
    text: "insert into courses(nombre,tutor,duracion,valoracion,precio,idespecialidad) values($1,$2,$3,$4,$5,$6)",
    values: [name, tutor, duracion, valoracion, precio, idespecialidad],
  };

  try {
    await client.query(query);

    return res.json({ message: "agregado" });
  } catch (e) {}
}
