import { useState, useRef, useEffect } from "react";
import { 
  Container, 
  Grid, 
  Paper, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Typography,
  Box
} from "@mui/material";
import QuotationTable from "./QuotationTable";
import sampleData from "./data/sampleQuotationData.json";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  // LocalStorage helper functions
  const loadDataFromStorage = () => {
    try {
      const savedData = localStorage.getItem('quotationData');
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return null;
    }
  };

  const saveDataToStorage = (data) => {
    try {
      localStorage.setItem('quotationData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  };

  // Initialize state - check localStorage first, then use sample data
  const initializeData = () => {
    const savedData = loadDataFromStorage();
    if (savedData && savedData.length > 0) {
      return savedData; // Use saved data if available
    } else {
      return sampleData.quotationItems; // Use sample data as pre-fill
    }
  };

  const [dataItems, setDataItems] = useState(initializeData);
  const [ppu, setPpu] = useState(products[0].price);
  const [selectedProduct, setSelectedProduct] = useState(products[0].code);

  // Save to localStorage whenever dataItems changes
  useEffect(() => {
    saveDataToStorage(dataItems);
  }, [dataItems]);

  const addItem = () => {
    let item = products.find((v) => selectedProduct === v.code)

    const newItem = {
      item: item.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value),
      discount: parseInt(discountRef.current.value) || 0,
    };

    console.log("Adding item:", newItem); // Debug log

    // Check for redundant items (same name and same price)
    const existingItemIndex = dataItems.findIndex(
      (existingItem) => 
        existingItem.item === newItem.item && 
        parseFloat(existingItem.ppu) === parseFloat(newItem.ppu)
    );

    if (existingItemIndex !== -1) {
      // Merge with existing item: add quantities and discounts
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        qty: parseInt(updatedItems[existingItemIndex].qty) + newItem.qty,
        discount: parseInt(updatedItems[existingItemIndex].discount) + newItem.discount,
      };
      setDataItems(updatedItems);
      console.log("Merged items:", updatedItems); // Debug log
    } else {
      // Add as new item
      const newItems = [...dataItems, newItem];
      setDataItems(newItems);
      console.log("Added new item:", newItems); // Debug log
    }
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const clearAllItems = () => {
    setDataItems([]);
  };

  const productChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedProduct(selectedCode);
    let item = products.find((v) => selectedCode === v.code);
    setPpu(item.price);
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Item</InputLabel>
                <Select
                  value={selectedProduct}
                  onChange={productChange}
                  label="Item"
                >
                  {products.map((p) => (
                    <MenuItem key={p.code} value={p.code}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Price Per Unit"
                inputRef={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(ppuRef.current.value)}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                inputRef={qtyRef}
                defaultValue={1}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Discount"
                inputRef={discountRef}
                defaultValue={0}
                inputProps={{ min: 0 }}
              />
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              onClick={addItem}
              sx={{ mt: 2 }}
            >
              Add
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAllItems={clearAllItems}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
