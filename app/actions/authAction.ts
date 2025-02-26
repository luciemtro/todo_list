"use server";
import { loginSchema } from "@/lib/validation";
import { registerSchema } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function registerUser(formData: FormData) {
  try {
    // 🟢 Étape 1: Convertir FormData en objet JS
    const rawData = Object.fromEntries(formData.entries());

    // 🟢 Étape 2: Valider avec Zod
    const parsedData = registerSchema.safeParse(rawData);
    if (!parsedData.success) {
      return { error: parsedData.error.flatten().fieldErrors };
    }

    const { name, email, password } = parsedData.data;

    // 🟢 Étape 3: Vérifier si l'email est déjà utilisé
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: { email: ["Cet email est déjà utilisé."] } };
    }

    // 🟢 Étape 4: Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🟢 Étape 5: Enregistrer en base
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return {
      success: "Inscription réussie. Vous pouvez maintenant vous connecter.",
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return {
      error: { global: "Une erreur est survenue. Réessayez plus tard." },
    };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    // 🟢 Étape 1: Validation avec Zod
    const parsedData = loginSchema.safeParse(rawData);
    if (!parsedData.success) {
      return { error: parsedData.error.flatten().fieldErrors };
    }

    const { email, password } = parsedData.data;

    // 🟢 Étape 2: Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { error: { global: "Email ou mot de passe incorrect." } };
    }

    // 🟢 Étape 3: Comparer le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: { global: "Email ou mot de passe incorrect." } };
    }

    return { success: "Validation réussie, prêt pour signIn." };
  } catch (error) {
    console.error("Erreur lors de la validation :", error);
    return {
      error: {
        global: "Une erreur est survenue. Veuillez réessayer plus tard.",
      },
    };
  }
}

// 🟢 Étape 1: Créer une fonction pour obtenir la session côté serveur
// 🟢 Étape 2: Utiliser la fonction getSession de NextAuth
// 🟢 Étape 3: Retourner la session
// 🟢 Étape 4: Gérer les erreurs
// 🟢 Étape 5: Exporter la fonction

export async function getSession() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }
    return session;
  } catch (error) {
    console.error("Erreur lors de la récupération de la session :", error);
    return null;
  }
}
