const APPLICANT = {
    permission_id: 1,
    role: "Nhân viên nhập liệu",
    permissions: [
        {
            permission_title: "Đóng hồ sơ",
            icon_class: "fa-solid fa-lock mr-2",
            update_state: {
                current_state: 1,
                new_state: 2
            },
            perm_id: 201
        },
        {
            permission_title: "Mở hồ sơ",
            icon_class: "fa-solid fa-lock-open mr-2",
            update_state: {
                current_state: 2,
                new_state: 1
            },
            perm_id: 202
        },
        {
            permission_title: "Nộp lưu cơ quan",
            icon_class: "fa-solid fa-box-archive mr-2",
            update_state: {
                current_state: 2,
                new_state: 3
            },
            perm_id: 203
        },
        {
            permission_title: "Nộp lưu lịch sử",
            icon_class: "fa-solid fa-book mr-2",
            update_state: {
                current_state: 4,
                new_state: 5
            },
            perm_id: 204
        }
    ]
}

const APPLICATION_REVIEWER = {
    permission_id: 2,
    role: "Người duyệt đơn",
    permissions: [
        {
            permission_title: "Duyệt nộp lưu cơ quan",
            icon_class: "fa-solid fa-check mr-2",
            update_state: {
                current_state: 3,
                new_state: 4
            }
        },
        {
            permission_title: "Từ chối hồ sơ nộp lưu cơ quan",
            icon_class: "fa-solid fa-xmark mr-2",
            update_state: {
                current_state: 3,
                new_state: 1
            }
        },
        {
            permission_title: "Nộp lưu lịch sử",
            icon_class: "fa-solid fa-book mr-2",
            update_state: {
                current_state: 4,
                new_state: 5
            }
        }
    ]
}


const userReducer = (state = APPLICANT, action) => {
    // switch (action.type) {
    //     case "SET_ROLE_TO_APPLICANT":
    //         return APPLICANT
    //     case "SET_ROLE_TO_APPLICATION_REVIEWER":
    //         return APPLICATION_REVIEWER
    //     default:
    //         return state
    // }

    // finalState = []
    // for (const permission of state.permissions) {
    //     if (permission.perm_id in permArrayOfUser) {
    //         finalState.push(permission);
    //     }
    // }
    return state; // TODO: return finaState
}

export default userReducer