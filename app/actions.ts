"use server";

/**
 * Inscription à la newsletter.
 * EDIT : appeler ici le fournisseur d'emailing (Resend, Beehiiv, ConvertKit, Brevo…).
 * Lever une erreur en cas d'échec : le formulaire affiche alors le message d'erreur.
 */
export async function subscribe(email: string) {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Invalid email");
}
