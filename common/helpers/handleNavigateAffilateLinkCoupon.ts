export const handleNavigateCouponAffiliateLink = (
  link: string,
  storeId: number,
  key: string,
  tagLine: string
) => {
  window.open(link, "_blank");

  window.location.href = `/user/browse/store/${storeId}?key=${key}&tagLine=${tagLine}`;
};
