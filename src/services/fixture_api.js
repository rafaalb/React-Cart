import _ from 'lodash';
import { getRandomImage } from './../services/get_random_image';

const sublevels = require('./../fixtures/sublevels.json');
const products = require('./../fixtures/products.json');
const categories = require('./../fixtures/categories.json');


export default {
  // Functions return fixtures
  getCategories: () => {
    return categories;
  },
  getProducts: () => {
    return products.map((prod) => {
      const image = getRandomImage(); //random image
      return {
        ...prod,
        image
      };
    });
  },
  getProduct: (id) => {
    return products.find((prod) => (prod.id) === (id));
  },
  getSubLevels: (id) => {
    //receive id sublevel
    if (id) {
      return sublevels[id].sublevels.map((subl) => {
        return {
          value: sublevels[subl].name,
          label: sublevels[subl].name,
          id: sublevels[subl].id
        };
      });
    }
    return Object.keys(sublevels).map((key) => {
         return {
           value: sublevels[key].name,
           label: sublevels[key].name,
           id: sublevels[key].id
         }
     });
  },
  groupProductsBySubLevel: (prods, id) => {
    const groupedBySublevel = _.groupBy(prods, 'sublevel_id')[id];
    const prod = prods.map((prod) => ( { ...prod, image: getRandomImage() } ));

    let groupedProds = [];
    if (groupedBySublevel) {
      groupedProds = groupedBySublevel.map((prod) => ( { ...prod, image: getRandomImage() }));
    }

    return id ? groupedProds : prod;
  },
};
