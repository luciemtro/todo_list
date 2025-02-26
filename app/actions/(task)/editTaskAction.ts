import { prisma } from "@/lib/prisma";
import { editTaskSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

//1 - Create a new function named editTask with an unknown parameter named data
//2 - Use the try/catch block to handle errors
//3 - Parse the data using the editTaskSchema
//4 - Use the prisma.task.update method to update the task
//5 - Revalidate the path
//6 - Return a success message and the updated task if successful
//7 - Return an error message if the data is invalid
//8 - Return an error message if there is a server error

export async function editTask(data: unknown) {
  try {
    const validateData = editTaskSchema.parse(data);
    const task = await prisma.task.update({
      where: {
        id: validateData.id,
      },
      data: validateData,
    });
    revalidatePath("/");
    return { success: true, task };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    console.error("Erreur serveur :", error);
    return { success: false, message: "Erreur interne du serveur." };
  }
}
