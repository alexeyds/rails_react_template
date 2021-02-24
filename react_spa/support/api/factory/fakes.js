import faker from "faker/locale/en";

export default faker;

faker.uniqueId = () => {
  return faker.random.number();
};
