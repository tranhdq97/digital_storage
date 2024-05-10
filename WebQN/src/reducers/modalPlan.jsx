import { ENUM_TYPE_PLAN } from "src/storage/Storage"

const INITIAL_STATE = {
    type: null,
    state: false,
    id: null,
    reFetchData: null
}

const ModalPlanReducer = (state = INITIAL_STATE, action) => {
    console.log(action.type);
    switch (action.type) {
        case "open_modal_collect_plan":
            return {
                ...state,
                type: ENUM_TYPE_PLAN.THU_THAP_NOP_LUU,
                state: true,
                id: action.id,
                reFetchData: action.reFetchData,
                oldState : action.oldState
            }
        case "close_modal_plan":
            return INITIAL_STATE;

        case "open_modal_bmcl_plan":
            return {
                ...state,
                type: ENUM_TYPE_PLAN.BIEN_MUC_CHINH_LY,
                state: true,
                oldState : action.oldState
            }
        default:
            return state
    }
}

export default ModalPlanReducer
