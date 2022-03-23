import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
import PaginationButtons from "./PaginationButtons";
const ProductList = () => {
  const {
    filtered_products: products,
    grid_view,
    paginated_products,
  } = useFilterContext();
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no product match your search
      </h5>
    );
  }
  if (!grid_view) {
    return (
      <>
        <PaginationButtons />
        <ListView products={paginated_products} />
      </>
    );
  }
  return (
    <>
      <PaginationButtons />
      <GridView products={paginated_products}>product list</GridView>
    </>
  );
};

export default ProductList;
