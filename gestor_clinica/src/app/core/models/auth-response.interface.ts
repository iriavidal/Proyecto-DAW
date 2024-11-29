export interface AuthResponse {
  status: number;
  results: {
    id_usuario: number;
    nombre_usuario: string;
    apellidos_usuario: string;
    email_usuario: string;
    token_usuario: string;
    token_exp_usuario: number;
    dni_usuario: string;
    direccion_usuario: string | null;
    id_rol: number | null;
    date_create: string;
    date_update: string;
  }[];
}
