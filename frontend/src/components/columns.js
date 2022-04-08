import { TextFilter } from "./TextFilter";
import { SelectFilter } from "./SelectFilter";
import { NumberFilter } from "./NumberFilter";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "_id",
    disableFilters: true,
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
    Filter: TextFilter,
  },
  {
    Header: "Description",
    Footer: "Description",
    accessor: "description",
    Filter: TextFilter,
  },
  {
    Header: "Category",
    Footer: "Category",
    accessor: "category",
    Filter: SelectFilter,
    filter: "includes",
  },
  {
    Header: "Price",
    Footer: "Price",
    accessor: "price",
    Cell: ({ value }) => {
      return (
        <td
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: "250px",
          }}
        >
          {value}$
        </td>
      );
    },
    Filter: NumberFilter,
    filter: "between",
  },
  {
    Header: "Image",
    Footer: "Image",
    accessor: "image",
    Cell: ({ value }) => {
      return (
        <img src={value.url} alt="Product" style={{ maxWidth: "150px" }} />
      );
    },
    disableFilters: true,
  },
];

export const COLUMNS_CART = [
  {
    Header: "Product",
    Footer: "Product",
    accessor: "product",
    disableFilters: true,
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    Footer: "Price",
    accessor: "price",
  },
  {
    Header: "Image",
    Footer: "Image",
    accessor: "image",
    Cell: ({ value }) => {
      return (
        <img src={value.url} alt="Product" style={{ maxWidth: "150px" }} />
      );
    },
    disableFilters: true,
  },
];
