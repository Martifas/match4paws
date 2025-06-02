const items = [
  {
    id: '1',
    title: 'Blue jeans',
    brand: "Levi's",
    size: 'M',
    price: 25,
    isNew: true,
  },
  {
    id: '2',
    title: 'Black T-shirt',
    brand: 'H&M',
    size: 'S',
    price: 10,
    isNew: false,
  },
  {
    id: '3',
    title: 'Red Hoodie',
    brand: 'Nike',
    size: 'L',
    price: 40,
    isNew: true,
  },
  {
    id: '4',
    title: 'White sneakers',
    brand: 'Adidas',
    size: 'M',
    price: 60,
    isNew: false,
  },
  {
    id: '5',
    title: 'Denim Jacket',
    brand: "Levi's",
    size: 'L',
    price: 50,
    isNew: false,
  },
  {
    id: '6',
    title: 'Green Shirt',
    brand: 'Zara',
    size: 'M',
    price: 20,
    isNew: true,
  },
];

const filter = {
  brand: "levi's",
  size: 'm',
  minPrice: 10,
  maxPrice: 30,
  isNew: true,
};

function filterItems(items, filters) {
  return items.filter(item => {
    if (filter.isNew !== undefined && item.isNew !== filters.isNew) {
      return false;
    }

    if (
      filter.brand !== undefined &&
      item.brand.toLowerCase().trim() !== filters.brand.toLowerCase().trim()
    ) {
      return false;
    }
    if (
      filter.size !== undefined &&
      item.size.toLowerCase() !== filters.size.toLowerCase()
    ) {
      return false;
    }
    if (
      filter.minPrice !== undefined &&
      filter.maxPrice !== undefined &&
      item.price <= filters.minPrice &&
      item.price >= filters.maxPrice
    ) {
      return false;
    }
    return true;
  });

  // for (let i = 0; i < items.length; i++) {
  //     let filteredItems = []
  //     let listItem = items[i]
  //     if (listItem !== filters.brand && listItem.size && filters.minPrice <= listItem.price  && filters.maxPrice >= listItem.price && listItem.isNew === filters.isNew) {
  //         filteredItems.push(listItem)
  //     } return filteredItems
  // }
}

console.log(filterItems(items, filter));
