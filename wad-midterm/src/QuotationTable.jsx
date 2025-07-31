
import { 
  Container, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableFooter,
  Paper,
  Typography,
  Box
} from "@mui/material";
import { ShoppingCart, Clear, Delete } from "@mui/icons-material";

import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex, clearAllItems }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Quotation
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <ShoppingCart />
          <Typography>No items</Typography>
        </Box>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => {
    const amount = v.qty * v.ppu;
    const finalAmount = amount - (v.discount || 0);
    return acc + finalAmount;
  }, 0);

  const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0);

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Quotation
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="outlined" 
          startIcon={<Clear />}
          onClick={clearAllItems}
        >
          Clear
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="quotation table">
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              let amount = v.qty * v.ppu;
              let finalAmount = amount - (v.discount || 0);
              return (
                <TableRow key={i} hover>
                  <TableCell align="center">
                    <Delete 
                      onClick={() => handleDelete(i)} 
                      sx={{ cursor: 'pointer', color: 'error.main' }}
                    />
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">{v.discount || 0}</TableCell>
                  <TableCell align="right">{finalAmount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total Discount</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{totalDiscount.toFixed(2)}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{total.toFixed(2)}</strong>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;
