import { useState, KeyboardEvent } from "react";
import { TextField } from "@mui/material";
import { QuantityPickerProps } from "../../../Types/Types";
import "./QuantityPicker.css"

const QuantityPicker = ({ quantity, onQuantityChange }: QuantityPickerProps) => {
  const [newQuantityInput, setNewQuantityInput] = useState(String(quantity))
  const [validInput, setValidInput] = useState(true);

  const handleInputChange = () => {
    const newQuantity = parseInt(newQuantityInput)
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity < 1000) {
      setValidInput(true);
      onQuantityChange(newQuantity);
    } else {
      setValidInput(false);
      setNewQuantityInput(String(quantity))
    }
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleInputChange()
    }
  };


  const inputQuantity = newQuantityInput === "0" ? "0" : newQuantityInput.length > 4 ? newQuantityInput.substring(0,4): newQuantityInput.replace(/^0+/, "");

  return (
    <div className="quantityContainer">
      <div>
      <TextField
        id="number"
        type="string"
        value={inputQuantity}
        onKeyDown={handleEnterPress}
        onChange={(e) => {setNewQuantityInput(e.target.value)}}
        inputProps={{ style: { textAlign: 'end', maxWidth: "3vw", minWidth: "60px" } }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>
      <div>
      {!validInput && <span className="errorMessage">Please enter a number between 0-1000</span> }
      </div>
      
    </div>
  );

}

export default QuantityPicker;