import GoogleCarouselClient from "./GoogleCarouselClient";
import {
  fetchFeaturableWidget,
  mapCarouselReviews,
} from "../../../lib/featurable";

export default async function GoogleCarousel({
  widget: widgetProp = null,
  reviews: reviewsProp = null,
}) {
  if (widgetProp && reviewsProp?.length) {
    return <GoogleCarouselClient widget={widgetProp} reviews={reviewsProp} />;
  }

  const widget = widgetProp ?? (await fetchFeaturableWidget());
  const reviews =
    reviewsProp?.length > 0
      ? reviewsProp
      : widget
        ? mapCarouselReviews(widget)
        : [];

  return <GoogleCarouselClient widget={widget} reviews={reviews} />;

}
