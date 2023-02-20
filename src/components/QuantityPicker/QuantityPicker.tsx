
import { TextField } from "@mui/material";

type QuantityPickerProps = {
    quantity: number,
    onQuantityChange: (newQuantity: number) => void
  };


const QuantityPicker = ({quantity, onQuantityChange}: QuantityPickerProps) => {
    


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    let newQuantity = Math.min(parseInt(newValue), 1000);
    newQuantity = isNaN(newQuantity) ? 0 : newQuantity;
    onQuantityChange(newQuantity);
  };
    
      return (
        <div style={{width: "100%", flexDirection: "row", justifyContent: "flex-end", display: "flex"}}>
          <TextField
            id="number"
            type="number"
            value={String(quantity).replace(/^0+(?!$)/, '')}
            onChange={handleInputChange}
            inputProps={{style: {textAlign: 'end', color: 'white', width: "3vw", minWidth: "45px"} }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        
        </div>
      );

}

export default QuantityPicker;