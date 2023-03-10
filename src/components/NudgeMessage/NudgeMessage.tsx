import { Item } from "../../Types/Types";
import { FaLongArrowAltRight } from "react-icons/fa";

interface INudgeMessage {
  product: Item;
  quantity: number;
  changeToUpsell: (id: string) => void;
  isProductInBasket: (id: string) => boolean
  getProductName: (id: string) => string | null
}

const NudgeMessage = ({ product, quantity, changeToUpsell, isProductInBasket, getProductName }: INudgeMessage) => {

  const rebateQuantity = product.rebateQuantity!
  const rebatePercentDec = product.rebatePercent!



  /*
   const quantityRebateOption = () => {

    const rebatePercent = rebatePercentDec * 100
    const rebateApplicable = rebateQuantity! > quantity
    const savedAmount = product.price * rebateQuantity * (1 - rebatePercentDec)
    return (
      <>
      {rebateApplicable ? 
        <div className="rebateContainer">
        <span>Buy {rebateQuantity - quantity} more to save {rebatePercent}%!</span>
      </div>
      :
      <div className="rebateContainer">
        <span className="rebatePercent"> -{rebatePercent}%!</span>
        <span>You are saving {savedAmount.toFixed(2)} DKK by purchasing {rebateQuantity} or more units!</span>
      </div>
    }
    </>
    )
   
  }
*/
  const quantityRebateOption = () => {

    const rebatePercent = rebatePercentDec * 100
    const rebateApplicable = rebateQuantity! > quantity
    
    if (rebateApplicable) {
      return (
        <div className="rebateContainer">
          <span>Buy {rebateQuantity - quantity} more to save {rebatePercent}%!</span>
        </div>
      )
    }

    const savedAmount = product.price * rebateQuantity * (1 - rebatePercentDec)

    return (
      <div className="rebateContainer">
        <span className="rebatePercent"> -{rebatePercent}%!</span>
        <span>You are saving {savedAmount.toFixed(2)} DKK by purchasing {rebateQuantity} or more units!</span>
      </div>
    )
  }


  const upSellOption = () => {
    const handleClick = () => {
      changeToUpsell(product.id)
    }

   
    if (!isProductInBasket(product.upsellProductId!)) {
      return (
        <div className="upSellContainer">
          <span>Go organic?</span>
          <FaLongArrowAltRight />
          <button onClick={handleClick} className="upSellButton"> {getProductName(product.upsellProductId!)} </button>
        </div>
      )
    }
    

  }

  return (
    <div>
      {quantityRebateOption()}
      {upSellOption()}
    </div>
  )

}

export default NudgeMessage;