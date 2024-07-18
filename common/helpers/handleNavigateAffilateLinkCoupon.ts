export const handleNavigateCouponAffiliateLink = (
  link: string,
  slug: string,
  key: string,
  tagLine: string,
  description: string
) => {
  window.open(
    `/store/${slug}?key=${key}&tagLine=${tagLine}&description=${description}`,
    "_blank"
  );

  window.location.href = link;
};
