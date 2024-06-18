export const isStoreFollowed = (storeId: number, store: any) => {
  const followerExist = store?.follower?.stores?.find(
    (item: any) => item.id === storeId
  );
  return followerExist ? true : false;
};
