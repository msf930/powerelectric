import Link from "next/link";

export default function GoogleBadgeDisplay({ widget }) {
  if (!widget) return null;

  const rating = widget?.gbpLocationSummary?.rating ?? 0;
  const reviewsCount = widget?.gbpLocationSummary?.reviewsCount ?? 0;
  const reviewUri = widget?.gbpLocationSummary?.writeAReviewUri ?? "#";

  return (
    <div className="flex items-center justify-center gap-2 bg-white rounded-md p-4 py-5">
      <img
        src="https://cdn.trustindex.io/assets/platform/Google/logo.svg"
        alt="Google"
        width={65}
        height={21}
        className="flex-shrink-0"
      />
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-0.5">
          {Array.from({ length: rating }, (_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="rgb(248, 175, 13)"
              className="w-5 h-5"
            >
              <path
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <p className="text-sm font-bold">{rating}.0</p>
        <p className="text-sm font-bold">|</p>
        <Link className="text-sm font-bold" href={reviewUri}>
          {reviewsCount} reviews
        </Link>
      </div>
    </div>
  );
}
