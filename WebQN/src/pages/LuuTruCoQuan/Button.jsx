
import { Button } from "antd";
import { GetKey } from "../../custom/Function";
import { Fragment } from "react";
import { ENUM_STATE_FILE } from "src/storage/Storage";

const ButtonFuctions = ({
    clickFunction,
    clickApprove = true,
    buttonName = null
}) => {
    return (
        <Fragment>
            <div key={GetKey()}>
                <Button className="border-none shadow-none text-green-500" onClick={clickFunction}>
                    {clickApprove && <i className="text-[20px] fa-regular fa-square-check"></i>}
                    {buttonName && <p className="text-black">{buttonName}</p>}
                </Button>
            </div>
        </Fragment>
    )
}

export default ButtonFuctions;
