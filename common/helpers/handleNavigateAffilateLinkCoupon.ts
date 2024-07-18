export const handleNavigateCouponAffiliateLink = (
  link: string,
  slug: string,
  couponSlug: string
) => {
  window.open(`/store/${slug}?coupon=${couponSlug}`, "_blank");

  window.location.href = link;
};
