"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import Image from "next/image";

const FEATURABLE_WIDGET_ID = "2e211976-a45b-49e0-bf80-c706b35c50a8";
const WIDGET_API_URL = `https://featurable.com/api/v2/widgets/${FEATURABLE_WIDGET_ID}`;
const VISIBLE_COUNT = 3;

export default function GoogleCarousel() {
  const [widget, setWidget] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(WIDGET_API_URL);
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        if (data?.success && data?.widget) {
          const w = data.widget;
          setWidget(w);

          const mapped =
            w.reviews?.map((r) => {
              const fullName = r.author?.name ?? "Anonymous";
              const parts = fullName.trim().split(/\s+/);
              let displayName = fullName;
              const date = new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              if (parts.length >= 2) {
                const first = parts[0];
                const lastInitial = parts[parts.length - 1].charAt(0);
                displayName = `${first} ${lastInitial}.`;
              }

              return {
                reviewId: r.id ?? null,
                profilePhotoUrl: r.author?.avatarUrl ?? r.author?.photoUrl ?? "",
                displayName,
                starRating: r.rating?.value ?? 0,
                comment: r.text ?? "",
                date: date,
              };
            }) ?? [];
          
          setReviews(mapped);
        }
      } catch (_err) {
        // ignore; carousel just won't render if fetch fails
      }
    }

    fetchData();
    
  }, []);

  useEffect(() => {
    if (!reviews.length) return;
    const id = setInterval(
      () => setCurrent((i) => (i + 1) % reviews.length),
      6000
    );
    return () => clearInterval(id);
  }, [reviews.length]);

  return (
    <section className={styles.googleCarousel} aria-label="Google reviews">
      <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-md p-4 py-5 mx-auto w-fit">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl font-bold">EXCELLENT</p>
          <div className="flex items-center justify-center gap-0.5">
            {Array.from(
              { length: widget?.gbpLocationSummary?.rating ?? 0 },
              (_, i) => (
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
              )
            )}
          </div>
          <Link
            className="text-sm font-bold"
            href={widget?.gbpLocationSummary?.writeAReviewUri ?? "#"}
          >
            Based on {widget?.gbpLocationSummary?.reviewsCount ?? 0} reviews
          </Link>
        </div>
        <img
          src="https://cdn.trustindex.io/assets/platform/Google/logo.svg"
          alt="Google"
          width={65}
          height={21}
          className="shrink-0"
        />
      </div>
      {reviews.length > 0 && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setCurrent(current - 1)}
            className="absolute left-[50px] top-1/3 cursor-pointer z-10"
            aria-label="Show previous review"
          ><SlArrowLeft className="w-10 h-10" />
          </button>
          <button
            type="button"
            onClick={() => setCurrent(current + 1)}
            className="absolute right-[50px] top-1/3 cursor-pointer z-10"
            aria-label="Show next review"
          ><SlArrowRight className="w-10 h-10" />
          </button>
        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${(current * 100) / VISIBLE_COUNT
                }%)`,
            }}
          >

            {reviews.map((review) => (
              <div
                key={review.reviewId ?? review.displayName}
                className={styles.carouselCard}
              >
                <div className="bg-white/95 rounded-lg shadow p-6 flex flex-col items-start text-center gap-3 border border-gray-200">
                  <div className="flex items-center justify-center gap-2">
                    {review.profilePhotoUrl && (
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={review.profilePhotoUrl}
                      alt={review.displayName}
                      
                      width={48}
                      height={48}
                    />
                    </div>
                    )}
                    <p className="font-semibold">{review.displayName}</p>
                  </div>
                  <p className="text-sm text-gray-700 text-left">{review.comment}</p>
                  <div className="flex w-full h-full items-end justify-end">
                    <div className="mt-2 flex w-full items-center justify-between">
                      <div className="flex flex-col items-start justify-start gap-0.5">
                        <p className="text-sm text-gray-700 text-left">{review.date}</p>
                        <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.starRating }, (_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="rgb(248, 175, 13)"
                            className="w-4 h-4"
                          >
                            <path
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                        </div>
                      </div>
                      <svg viewBox="0 0 512 512" width="44" height="44"><g id="logo-g" height="44" width="44" fill="none" fillRule="evenodd" className="badge__google-icon" data-featurable-classname=".badge__google-icon" data-featurable-description="Badge google logo" data-featurable-group="badge layout"><path d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z" fill="#4285f4"></path><path d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z" fill="#34a853"></path><path d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z" fill="#fbbc05"></path><path d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z" fill="#ea4335"></path><path d="M20 20h472v472H20V20z"></path></g></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reviews.length > VISIBLE_COUNT && (
            <div className="mt-3 flex justify-center gap-1">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full ${i === current ? "bg-black" : "bg-gray-300"
                    }`}
                  aria-label={`Show review ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        </div>
      )}
    </section>
  );
}
