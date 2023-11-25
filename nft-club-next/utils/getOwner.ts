import getCotnract from "./getCotnract";

const getOwner = async () => {
  const contract = await getCotnract();
  const owner = contract?.getOwner();
  return owner;
};

export default getOwner;
