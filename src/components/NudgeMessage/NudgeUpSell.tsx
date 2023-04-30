import { FaLongArrowAltRight } from "react-icons/fa";
import { useCartContext } from "../../contexts/CartContext";

interface INudgeUpSell {
    productId: string,
    upSellName: string
}

const NudgeUpSell = ({ productId, upSellName }: INudgeUpSell) => {
    
    const {changeToUpsell} = useCartContext();

    return (
        <div className="upSellContainer" data-testid='upSellContainer'>
            <span>Go organic?</span>
            <FaLongArrowAltRight />
            <button onClick={() => changeToUpsell(productId)} className="upSellButton"> {upSellName} </button>
        </div>
    )

}

export default NudgeUpSell;