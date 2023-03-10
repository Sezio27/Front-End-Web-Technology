interface INudgeQuantityRebate {
    rebateQuantity: number,
    rebatePercentDec: number,
    quantity: number,
    price: number
}

const NudgeQuantityRebate = ({ rebateQuantity, rebatePercentDec, quantity, price }: INudgeQuantityRebate) => {

    const rebateApplicable = rebateQuantity > quantity
    const rebatePercent = rebatePercentDec * 100
    const savedAmount = price * rebateQuantity * (1 - rebatePercentDec)

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

export default NudgeQuantityRebate;