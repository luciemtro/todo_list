import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Email invalide."),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide."),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

export const addTaskSchema = z.object({
  title: z
    .string()
    .min(2, "Le titre doit contenir au moins 2 caractères.")
    .max(255, "Le titre est trop long."),

  content: z
    .string()
    .min(2, "Le contenu doit contenir au moins 2 caractères.")
    .max(5000, "Le contenu est trop long.")
    .optional()
    .nullable(),
  userId: z.string().uuid("ID utilisateur invalide."),
});

export const editTaskSchema = z.object({
  id: z.string().uuid("L'ID de la tâche est invalide."),
  title: z
    .string()
    .min(2, "Le titre doit contenir au moins 2 caractères.")
    .max(255, "Le titre est trop long.")
    .optional(),

  content: z
    .string()
    .min(2, "Le contenu doit contenir au moins 2 caractères.")
    .max(5000, "Le contenu est trop long.")
    .optional()
    .nullable(),
});

export const deleteTaskSchema = z.object({
  id: z.string().uuid("L'ID de la tâche est invalide."),
});

export const getTaskSchema = z.object({
  id: z.string().uuid("L'ID de l'utilisateur est invalide."),
});
