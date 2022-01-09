export class Course {
  name: string;
  tutor: string;
  duracion: string;
  valoracion: number;
  precio: number;
  idespecialidad: number;
  constructor({
    name,
    tutor,
    duracion,
    valoracion,
    precio,
    idespecialidad,
  }: {
    name: string;
    tutor: string;
    duracion: string;
    valoracion: number;
    precio: number;
    idespecialidad: number;
  }) {
    (this.name = name),
      (this.tutor = tutor),
      (this.duracion = duracion),
      ((this.valoracion = valoracion),
      (this.precio = precio),
      (this.idespecialidad = idespecialidad));
  }
}
