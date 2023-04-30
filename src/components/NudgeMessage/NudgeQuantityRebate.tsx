interface INudgeQuantityRebate {
    rebateQuantity: number,
    rebatePercentDec: number,
    quantity: number,
    price: number
}

const NudgeQuantityRebate = ({ rebateQuantity, rebatePercentDec, quantity, price }: INudgeQuantityRebate) => {

    const rebateApplicable = rebateQuantity > quantity
    const savedAmount = price * rebateQuantity * (rebatePercentDec/100)
    return (
        <>
            {rebateApplicable ?
                <div className="rebateContainer">
                    <span>Buy {rebateQuantity - quantity} more to save {rebatePercentDec}%!</span>
                </div>
                :
                <div className="rebateContainer">
                    <span className="rebatePercent"> -{rebatePercentDec}%!</span>
                    <span>You are saving {savedAmount.toFixed(2)} DKK by purchasing minimum {rebateQuantity} units!</span>
                </div>
            }
        </>
    )
}

export default NudgeQuantityRebate;