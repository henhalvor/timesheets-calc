import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function getUserId() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (user) {
      return user.id as string;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
}