export const getAvatarFallback = (fullName: string) => {
  return fullName[0] + fullName.split(" ")[1][0];
};
