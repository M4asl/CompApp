import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useGlobalFilter, useSortBy, useTable, useFilters } from "react-table";
import { addToCart } from "../actions/cartActions";
import { toast } from "react-toastify";
import { deleteProduct, listProducts } from "../actions/productActions";
import styled from "styled-components";
import { COLUMNS } from "../components/columns";
import { PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import Loader from "../components/Loader";

const Home = ({ history }) => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const addToCartHandler = (id, qty = 1) => {
    dispatch(addToCart(id, qty));
    toast.success("The product has been added.");
  };

  const editButtonHandler = (id) => {
    history.push(`/products/${id}`);
  };

  const removeProductHandler = (id) => {
    dispatch(deleteProduct(id));
    // toast.error("The product has been removed.");
    // console.log(productsData);
    // const removeItem = productsData.filter((item) => item._id !== id);
    // console.log(removeItem);
    // const dataCopy = [...products];
    // dataCopy.splice(id, 1);
    // console.log(dataCopy);
    // console.log(removeItem);
    // dispatch({ type: PRODUCT_LIST_SUCCESS, payload: removeItem });
  };

  const productsColumns = useMemo(() => COLUMNS, []);

  const productsData = useMemo(() => [...products], [products]);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Cart",
        Header: "Cart",
        Footer: "Cart",
        Cell: ({ row }) => (
          <CartButton onClick={() => addToCartHandler(row.values._id)}>
            <AiOutlineShoppingCart />
          </CartButton>
        ),
      },
      {
        id: "Edit",
        Header: "Edit",
        Footer: "Edit",
        Cell: ({ row }) => (
          <EditButton onClick={() => editButtonHandler(row.values._id)}>
            Edit
          </EditButton>
        ),
      },
      {
        id: "Delete",
        Header: "Delete",
        Footer: "Delete",
        Cell: ({ row }) => (
          <DeleteButton onClick={() => removeProductHandler(row.values._id)}>
            Delete
          </DeleteButton>
        ),
      },
    ]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns: productsColumns, data: productsData },
    useFilters,
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  return (
    <>
      {loading && <Loader />}
      {error && <div>{error}</div>}
      {!loading && products.length === 0 && (
        <h1 style={{ textAlign: "center" }}>No products found.</h1>
      )}
      {products.length > 0 && (
        <>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableHeader
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </TableHeader>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, idx) => {
                prepareRow(row);

                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell, idx) => (
                      <TableData {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableData>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              {footerGroups.map((footerGroup) => (
                <TableRow {...footerGroup.getFooterGroupProps()}>
                  {footerGroup.headers.map((column) => (
                    <TableHeader {...column.getFooterProps()}>
                      {column.render("Footer")}
                    </TableHeader>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
          <DataCount>
            {rows.length > 0
              ? `Showing results of ${rows.length} items.`
              : "Product not found."}
          </DataCount>
        </>
      )}
    </>
  );
};

export default Home;

const Table = styled.table`
  margin: 0 auto;
  color: ${({ theme }) => theme.text.primary};
`;

const TableHead = styled.thead`
  padding: 20px;
`;

const TableRow = styled.tr`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.bg.colorBorder};
`;

const TableHeader = styled.th`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.bg.colorBorder};
`;

const TableFooter = styled.tfoot`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.bg.colorBorder};
`;

const TableBody = styled.tbody``;

const TableData = styled.td`
  max-width: 250px;
  overflow-wrap: break-word;
  text-align: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.bg.colorBorder};
`;

const CartButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.buttons.success};
`;

const EditButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.buttons.primary};
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.buttons.danger};
`;

const DataCount = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0px;
  font-size: 2rem;
`;
