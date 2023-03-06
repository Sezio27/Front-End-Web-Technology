
import { TextField } from "@mui/material";
import { QuantityPickerProps } from "../../../Types/Types";


const QuantityPicker = ({quantity, onQuantityChange}: QuantityPickerProps) => {
    


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    let newQuantity = Math.min(parseInt(newValue), 1000);
    newQuantity = isNaN(newQuantity) ? 0 : newQuantity;
    onQuantityChange(newQuantity);
  };
    
      return (
        <div>
          <TextField
            id="number"
            type="number"
            value={String(quantity).replace(/^0+(?!$)/, '')}
            onChange={handleInputChange}
            inputProps={{style: {textAlign: 'end', color: 'black', width: "3vw", minWidth: "60px"} }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        
        </div>
      );

}

export default QuantityPicker;