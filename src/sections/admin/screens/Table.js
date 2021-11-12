import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { getStates } from "../../../apis/admin";
import PageLoader from "../../../components/PageLoader";

import queryString from "query-string";
import { useHistory } from "react-router-dom";

import {
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Pagination,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import { Helmet } from "react-helmet-async";

const columns = [
  { id: "id", label: "ID", sorting: true },
  { id: "name", label: "Name", sorting: true },
  { id: "status", label: "Status", sorting: true },
];

function TableExample() {
  const history = useHistory();
  let queryParams = queryString.parse(history.location.search);

  const [loading, setisLoading] = React.useState(true);
  // date
  const [page, setPage] = React.useState(1);
  const [sorting, setSorting] = React.useState({
    sort: queryParams.sort,
    order: queryParams.order,
  });
  const [states, setStates] = React.useState([]);

  const statesData = React.useCallback(() => {
    getStates(history.location.search).then((result) => {
      //
      if (result.status === true) {
        setStates(result.data);
        setisLoading(false);
        setPage(result.data.current_page);
        setSorting({ sort: queryParams.sort, order: queryParams.order });
        console.log("Result", result.data);
      }
    });
  }, [page, sorting.sort, sorting.order]);

  React.useEffect(() => {
    statesData();
  }, [statesData]);

  let showActions = true;

  const handleChangePage = (event, newPage) => {
    queryParams.page = newPage;
    history.push(
      `${window.location.pathname}?${queryString.stringify(queryParams)}`
    );
    setPage(newPage);
  };

  const handleSorting = async (column) => {
    if (queryParams.sort && queryParams.sort == column) {
      queryParams.order = queryParams.order === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort = column;
      queryParams.order = "asc";
    }

    setSorting({ sort: queryParams.sort, order: queryParams.order });

    history.push(
      `${window.location.pathname}?${queryString.stringify(queryParams)}`
    );
  };

  // dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!loading) {
    return (
      <div>
        <Helmet>
          <title>Data Table</title>
        </Helmet>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      verticalAlign: "center",
                    }}>
                    {column.sorting ? (
                      <TableSortLabel
                        active={sorting.sort === column.id}
                        direction={sorting.order === "desc" ? "desc" : "asc"}
                        hideSortIcon={false}
                        onClick={() => handleSorting(column.id)}>
                        <Typography
                          style={{
                            fontWeight: 500,
                            display: "inline-block",
                            textAlign: "center",
                            color: "#000",
                            fontSize: "14px",
                          }}>
                          {column.label}
                        </Typography>
                      </TableSortLabel>
                    ) : (
                      <Typography
                        style={{
                          fontWeight: 500,
                          display: "inline-block",
                          textAlign: "center",
                          color: "#000",
                          fontSize: "14px",
                        }}>
                        {column.label}
                      </Typography>
                    )}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell
                    key="actions"
                    align="right"
                    style={{ minWidth: "80px", verticalAlign: "center" }}>
                    <Typography
                      style={{
                        fontWeight: 500,
                        display: "inline-block",
                        textAlign: "center",
                        color: "#000",
                        fontSize: "14px",
                      }}>
                      Actions
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {states.data.map((row, idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ verticalAlign: "center" }}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    {showActions && (
                      <TableCell
                        key="actions"
                        align="right"
                        style={{ verticalAlign: "center" }}>
                        <div className="action-button-container">
                          <IconButton
                            key="id"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}>
                            <MoreHorizIcon />
                          </IconButton>
                          <Menu
                            id="dropdown-menu"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                              top: "55px",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            sx={{ top: "40px" }}
                            className="dropdown-items">
                            <MenuItem onClick={handleClose} disableRipple>
                              <EditIcon />
                              Edit User
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
                              <DeleteIcon />
                              Delete User
                            </MenuItem>
                          </Menu>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 20px",
            }}>
            <Typography
              style={{
                fontSize: 14,
                marginTop: "5px",
              }}>
              Page {states.current_page} of{" "}
              {states.last_page ? states.last_page : 0}
            </Typography>

            <Pagination
              // rowsPerPageOptions={[10, 15, 20, 30, 50, 100]}
              defaultPage={states.current_page}
              showFirstButton={true}
              showLastButton={true}
              component="div"
              count={states.last_page}
              // rowsPerPage={states.per_page}
              page={parseInt(states.current_page)}
              onChange={handleChangePage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </TableContainer>
      </div>
    );
  } else {
    return (
      <>
        <PageLoader status={loading} />
      </>
    );
  }
}

export default TableExample;
