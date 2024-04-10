import { Fragment, useState } from "react";
import { useProduct, useProducts } from "../services/queries";

export const Products = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const productsQuery = useProducts();

  const productQuery = useProduct(selectedProductId);

  return (
    <>
      {/* pages.map will return  another array in each iteration - so we can map over those */}
      {productsQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {" "}
          {group.map((product) => (
            <Fragment key={product.id}>
              <button onClick={() => setSelectedProductId(product.id)}>
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetching
            ? "Loading more..."
            : productsQuery.hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>Selected product: {JSON.stringify(productQuery.data)}</div>
    </>
  );
};
