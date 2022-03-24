import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  UPDATE_PAGINATION,
} from "./actions";
import paginate from "../utils/paginate";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxprice = action.payload.map((p) => p.price);
    maxprice = Math.max(...maxprice);
    const paginated = paginate(action.payload);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      all_pagination: paginated,
      paginated_products: paginated[0],
      current_pagination: 0,
      filters: { ...state.filters, max_price: maxprice, price: maxprice },
    };
  }
  // paginate product
  if (action.type === UPDATE_PAGINATION) {
    return {
      ...state,
      paginated_products: state.all_pagination[action.payload],
      current_pagination: action.payload,
    };
  }
  // view products
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  // update sort products
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  // sort products main function
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    let paginated = paginate(tempProducts);
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      paginated = paginate(tempProducts);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      paginated = paginate(tempProducts);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      paginated = paginate(tempProducts);
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      paginated = paginate(tempProducts);
    }
    return {
      ...state,
      filtered_products: tempProducts,
      all_pagination: paginated,
      paginated_products: paginated[0],
      current_pagination: 0,
    };
  }
  // update filter products
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  // filter products main function
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, price, featured } = state.filters;
    let tempProducts = [...all_products];
    let paginated = paginate(tempProducts);
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().includes(text.trim().toLowerCase());
      });
    }

    tempProducts = tempProducts.filter((product) => product.price <= price);

    if (featured) {
      tempProducts = tempProducts.filter(
        (product) => product.featuredProduct === true
      );
    }
    paginated = paginate(tempProducts);
    return {
      ...state,
      filtered_products: tempProducts,
      all_pagination: paginated,
      paginated_products: paginated[0],
      current_pagination: 0,
    };
  }
  // clear filters
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        price: state.filters.max_price,
        featured: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
