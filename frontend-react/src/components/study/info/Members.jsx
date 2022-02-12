import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import { setHeader } from "../../../utils/api";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router";

function Members({ members }) {
  const params = useParams();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#f2dcc2",
    },
  }));
  const rows = members;
  const handleOut = (email) => {
    axios({
      method: "delete",
      url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}/member`,
      headers: setHeader(),
      params: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response.data.errorMessage);
      });
  };
  const handleMaster = (email) => {
    axios({
      method: "put",
      url: `https://i6d201.p.ssafy.io/api/v1/study/${params.id}/member`,
      headers: setHeader(),
      params: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res.data);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response.data.errorMessage);
      });
  };
  return (
    <TableContainer component={Paper}>
      <Table
        // size="small"
        sx={{ width: "100%", minWidth: 300 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>닉네임</StyledTableCell>
            {/* <StyledTableCell align="right">닉네임</StyledTableCell> */}
            <StyledTableCell>관심사</StyledTableCell>
            <StyledTableCell>한마디</StyledTableCell>
            <StyledTableCell>강퇴</StyledTableCell>
            <StyledTableCell>스터디장위임</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ? rows.map((row) => (
                <TableRow
                  // onClick={(event) => handleClick(event, row.id)}
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar>{row.nickname.slice(0, 1)}</Avatar>
                    {row.nickname}
                  </TableCell>
                  {/* <TableCell align="right">{row.email}</TableCell> */}
                  <TableCell>리액트...</TableCell>
                  <TableCell>화이팅..</TableCell>
                  <TableCell>
                    <DisabledByDefaultIcon
                      color="error"
                      onClick={() => handleOut(row.email)}
                    />
                  </TableCell>
                  <TableCell>
                    <EscalatorWarningIcon
                      color="warning"
                      onClick={() => handleMaster(row.email)}
                    />
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Members;
