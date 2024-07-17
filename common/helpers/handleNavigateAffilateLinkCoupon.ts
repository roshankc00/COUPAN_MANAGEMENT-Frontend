export const handleNavigateCouponAffiliateLink = (
  link: string,
  storeId: number,
  key: string,
  tagLine: string,
  description: string
) => {
  window.open(
    `/store/${storeId}?key=${key}&tagLine=${tagLine}&description=${description}`,
    "_blank"
  );

  window.location.href = link;
};
