const faker = require("faker");
const fs = require("fs");
faker.locale = "en";

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];
  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
    };

    categoryList.push(category);
  });

  return categoryList;
};
const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  // random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        category: { id: category.id, name: category.name}
      };

      productList.push(product);
    });
  }

  return productList;
};
(() => {
  //random data
  const categoryList = randomCategoryList(3);
  const productList = randomProductList(categoryList, 4);

  // prepare db obj
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Po",
    },
  };
  // write db to db.js
  fs.writeFile("db.json", JSON.stringify(db), () => {});
})();
