export interface Cochera {
    id: number; // o el tipo que corresponda, como string si es UUID
    descripcion: string;
    activo?: any; // Define el tipo según lo que tu aplicación requiera
    deshabilitada?: boolean;
  }
  