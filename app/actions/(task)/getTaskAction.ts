import { prisma } from "@/lib/prisma";
import { getTaskSchema } from "@/lib/validation";
import { getSession } from "@/actions/authAction";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// 🔹 Étape 1 : Valider les données avec Zod (safeParse)

// 🔹 Étape 2 : Vérifier si la validation a échoué et retourner une erreur si nécessaire

// 🔹 Étape 3 : Récupérer la session utilisateur

// 🔹 Étape 4 : Vérifier si l'utilisateur est connecté et retourner une erreur si nécessaire

// 🔹 Étape 5 : Récupérer les tâches depuis la base de données avec Prisma

// 🔹 Étape 6 : Vérifier si aucune tâche n'a été trouvée et retourner un message approprié

// 🔹 Étape 7 : Rafraîchir les données avec revalidatePath (si nécessaire)

// 🔹 Étape 8 : Retourner les tâches récupérées avec succès

// 🔹 Étape 9 : Gérer les erreurs Zod (validation des données)

// 🔹 Étape 10 : Gérer les erreurs serveur et retourner un message d'erreur générique

export async function getTasks(data: unknown) {
  try {
    const validateData = getTaskSchema.safeParse(data);
    if (!validateData.success) {
      return {
        success: false,
        message: "Données invalides.",
        errors: validateData.error.flatten().fieldErrors,
      };
    }
    const session = await getSession();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Vous devez être connecté pour voir vos tâches.",
      };
    }
    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    revalidatePath("/");

    if (tasks.length === 0) {
      return { success: false, message: "Aucune tâche trouvée." };
    }

    return { success: true, tasks };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    console.error("Erreur serveur :", error);
    return { success: false, message: "Erreur interne du serveur." };
  }
}
// Sans zod
// 🔹 Étape 1 : Récupérer la session utilisateur
// const session = await getSession();

// 🔹 Étape 2 : Vérifier si l'utilisateur est connecté et retourner une erreur si nécessaire
// if (!session || !session.user || !session.user.id) {
//     return { success: false, message: "Vous devez être connecté pour voir vos tâches." };
// }

// 🔹 Étape 3 : Vérifier que `data` est bien défini et contient les bonnes propriétés (validation manuelle)
// if (!data || typeof data !== "object") {
//     return { success: false, message: "Données invalides." };
// }

// 🔹 Étape 4 : Vérifier si certaines propriétés spécifiques sont nécessaires et valides
// if (data.status && typeof data.status !== "string") {
//     return { success: false, message: "Le statut doit être une chaîne de caractères." };
// }

// 🔹 Étape 5 : Récupérer les tâches depuis la base de données avec Prisma en utilisant `data` si applicable
// const tasks = await prisma.task.findMany({
//     where: {
//         userId: session.user.id,
//         ...(data.status ? { status: data.status } : {}) // Appliquer un filtre si `status` est fourni
//     },
//     orderBy: { createdAt: "desc" },
// });

// 🔹 Étape 6 : Vérifier si aucune tâche n'a été trouvée et retourner un message approprié
// if (tasks.length === 0) {
//     return { success: false, message: "Aucune tâche trouvée." };
// }

// 🔹 Étape 7 : Rafraîchir les données avec `revalidatePath` (si nécessaire)
// revalidatePath("/");

// 🔹 Étape 8 : Retourner les tâches récupérées avec succès
// return { success: true, tasks };

// 🔹 Étape 9 : Gérer les erreurs serveur avec `try/catch` et retourner un message d'erreur générique
// try { } catch (error) {
//     console.error("Erreur serveur :", error);
//     return { success: false, message: "Erreur interne du serveur." };
// }
