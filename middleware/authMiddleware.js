export const authenticateUser = async (requestAnimationFrame, res, next) => {
  console.log("auth middleware");
  next();
};
