import { cache } from "react";

export const FEATURABLE_WIDGET_ID = "2e211976-a45b-49e0-bf80-c706b35c50a8";
export const FEATURABLE_API_URL = `https://featurable.com/api/v2/widgets/${FEATURABLE_WIDGET_ID}`;

export const fetchFeaturableWidget = cache(async () => {
  try {
    const res = await fetch(FEATURABLE_API_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.success && data?.widget ? data.widget : null;
  } catch {
    return null;
  }
});

function reviewPhotoUrl(r) {
  const a = r?.author;
  if (!a) return "";
  return (
    a.avatarUrl ??
    a.photoUrl ??
    a.profilePhotoUrl ??
    a.imageUrl ??
    (typeof a.image === "string" ? a.image : a.image?.url) ??
    ""
  );
}

function formatReviewName(fullName) {
  const name = fullName ?? "Anonymous";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
  }
  return name;
}

export function mapCarouselReviews(widget) {
  return (
    widget?.reviews?.map((r) => {
      const displayName = formatReviewName(r.author?.name);
      const date = new Date(r.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return {
        reviewId: r.id ?? null,
        profilePhotoUrl: reviewPhotoUrl(r),
        displayName,
        starRating: r.rating?.value ?? 0,
        comment: r.text ?? "",
        date,
      };
    }) ?? []
  );
}

export function mapReviewSnippets(widget, limit = 3) {
  const raw = widget?.reviews ?? [];
  return raw.slice(0, limit).map((r) => {
    const displayName = formatReviewName(r.author?.name ?? "Customer");
    const text = r.text ?? "";
    const truncated =
      text.length <= 220 ? text : `${text.slice(0, 220).trim()}…`;
    return {
      id: r.id ?? displayName,
      displayName,
      comment: truncated,
      photo: reviewPhotoUrl(r),
      stars: r.rating?.value ?? 5,
    };
  });
}
