import { NextResponse } from "next/server";
import { campaigns } from "@/content/banners";

/**
 * Lien de clic des bannières : /play/[slug]/ → URL de l'annonceur.
 * Point unique pour compter les clics (EDIT : envoyer un événement analytics ici).
 * Jamais indexé, jamais mis en cache.
 */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = campaigns[slug];
  const headers = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" };

  if (!campaign) {
    return NextResponse.redirect(new URL("/", request.url), { status: 302, headers });
  }

  // URL externe (annonceur) ou interne (bannière maison : « /deals/ »)
  const target = new URL(campaign.url, request.url);
  const external = target.origin !== new URL(request.url).origin;
  if (external && !target.searchParams.has("utm_source")) {
    target.searchParams.set("utm_source", "virdico");
    target.searchParams.set("utm_medium", "banner");
    target.searchParams.set("utm_campaign", slug);
  }
  return NextResponse.redirect(target, { status: 302, headers });
}
