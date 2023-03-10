import { FaLongArrowAltRight } from "react-icons/fa";

interface INudgeUpSell {
    productId: string,
    upSellName: string
    changeToUpsell: (id: string) => void;
}

const NudgeUpSell = ({ productId, upSellName, changeToUpsell }: INudgeUpSell) => {

    const handleClick = () => {
        changeToUpsell(productId)
    }

    return (
        <div className="upSellContainer">
            <span>Go organic?</span>
            <FaLongArrowAltRight />
            <button onClick={handleClick} className="upSellButton"> {upSellName} </button>
        </div>
    )

}

export default NudgeUpSell;