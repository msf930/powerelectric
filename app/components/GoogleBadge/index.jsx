import GoogleBadgeClient from "./GoogleBadgeClient";
import GoogleBadgeDisplay from "./GoogleBadgeDisplay";

export default function GoogleBadge({ widget }) {
  if (widget) {
    return <GoogleBadgeDisplay widget={widget} />;
  }
  return <GoogleBadgeClient />;
}
