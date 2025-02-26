import { prisma } from "@/lib/prisma";
import { deleteTaskSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

//1 - Create a new function named deleteTask with an unknown parameter named data
//2 - Use the try/catch block to handle errors
//3 - Parse the data using the deleteTaskSchema
//4 - Use the prisma.task.delete method to delete the task
//5 - Revalidate the path
//6 - Return a success message if successful
//7 - Return an error message if the data is invalid
//8 - Return an error message if there is a server error

export async function deleteTask(data: unknown) {
  try {
    const validateData = deleteTaskSchema.parse(data);
    await prisma.task.delete({
      where: {
        id: validateData.id,
      },
    });
    revalidatePath("/");
    return { success: true, message: "La tâche a été supprimée." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    console.error("Erreur serveur :", error);
    return { success: false, message: "Erreur interne du serveur." };
  }
}
