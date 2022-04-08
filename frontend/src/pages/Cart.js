import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { removeFromCart } from "../actions/cartActions";
import { toast } from "react-toastify";
import { listProducts } from "../actions/productActions";
import styled from "styled-components";
import { COLUMNS_CART } from "../components/columns";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.error("The product has been removed.");
  };

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const cartColumns = useMemo(() => COLUMNS_CART, []);

  const cartData = useMemo(() => [...cartItems], [cartItems]);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,

      {
        id: "Delete",
        Header: "Delete",
        Footer: "Delete",
        Cell: ({ row }) => (
          <DeleteButton
            onClick={() => removeFromCartHandler(row.values.product)}
          >
            Delete
          </DeleteButton>
        ),
      },
    ]);
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const marginLeftTwo = 400;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Computer Components";
    const total = cartItems
      .reduce((acc, item) => acc + item.price, 0)
      .toFixed(2);
    const totalText = `Total price ${total}$`;
    const headers = [["Product id", "name", "price"]];

    const data = cartItems.map((el) => [el.product, el.name, `${el.price}$`]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.text(totalText, marginLeftTwo, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns: cartColumns, data: cartData },

    tableHooks
  );

  const isEven = (idx) => idx % 2 === 0;

  return (
    <>
      {cartItems.length === 0 && (
        <h1 style={{ textAlign: "center" }}>Cart is empty.</h1>
      )}
      {cartItems.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => exportPDF()}>Export to pdf</Button>
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>Total: </h3>
            <CartTotalPrice>
              {cartItems.length > 0
                ? cartItems
                    .reduce((acc, item) => acc + item.price, 0)
                    .toFixed(2)
                : "0"}
              $
            </CartTotalPrice>
          </div>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableHeader {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </TableHeader>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, idx) => {
                prepareRow(row);

                return (
                  <TableRow
                    {...row.getRowProps()}
                    className={isEven(idx) ? "bg-green-400 bg-opacity-30" : ""}
                  >
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
          <DataCount>Showing results of {rows.length} items.</DataCount>
        </>
      )}
    </>
  );
};

export default Cart;

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
  max-width: 300px;
  overflow-wrap: break-word;
  text-align: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.bg.colorBorder};
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

const CartTotalPrice = styled.h3`
  color: ${({ theme }) => theme.buttons.success};
  letter-spacing: 0.1rem;
  font-weight: 500;
`;

const Button = styled.button`
  width: 180px;
  min-height: 35px;
  margin: 20px 0px;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 120px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 80px;
    min-height: 30px;
    font-size: 1rem;
  }
`;
