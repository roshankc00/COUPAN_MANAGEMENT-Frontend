export const handleNavigateCouponAffiliateLink = (
  link: string,
  storeId: number,
  key: string,
  tagLine: string
) => {
  window.open(
    `/user/browse/store/${storeId}?key=${key}&tagLine=${tagLine}`,
    "_blank"
  );

  window.location.href = link;
};
