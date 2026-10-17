"use server";

/** EDIT : appeler ici le fournisseur d'emailing (Resend, Beehiiv, ConvertKit…). Lever une erreur en cas d'échec. */
export async function subscribe(email: string) {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Invalid email");
}
