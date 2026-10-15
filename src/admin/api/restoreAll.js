import { updateDeleteStatus } from "./updateDeleteStatus";

export const restoreAll = async (products) => {
  return Promise.all(
    products.map((product) =>
      updateDeleteStatus({ id: product.id, isDeleted: false }),
    ),
  );
};
