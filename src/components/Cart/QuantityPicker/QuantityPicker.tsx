import { useState, KeyboardEvent, FocusEvent } from "react";
import { TextField } from "@mui/material";
import { QuantityPickerProps } from "../../../Types/Types";
import "./QuantityPicker.css"
import { useCartContext } from "../../../contexts/CartContext";


const QuantityPicker = ({ productId, quantity}: QuantityPickerProps) => {
  const {onQuantityChange} = useCartContext()
  
  const [newQuantityInput, setNewQuantityInput] = useState(String(quantity))
  const [validInput, setValidInput] = useState(true);

  const handleInputChange = () => {
    const newQuantity = parseInt(newQuantityInput)
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity < 1000) {
      setValidInput(true);
      onQuantityChange(productId, newQuantity);
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

  const handleFocusLoss = (e: FocusEvent<HTMLInputElement>) => {
    handleInputChange()
  }


  const inputQuantity = newQuantityInput === "0" ? "0" : newQuantityInput.length > 4 ? newQuantityInput.substring(0,4): newQuantityInput.replace(/^0+/, "");

  return (
    <div className="quantityContainer">
      <div>
      <TextField
        id="number"
        type="string"
        label='Qty'
        value={inputQuantity}
        onKeyDown={handleEnterPress}
        onBlur = {handleFocusLoss}
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