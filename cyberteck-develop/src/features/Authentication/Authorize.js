import { useSelector } from "react-redux";


export function useAuthorize(userType) {
    const auth = useSelector(state => state.auth);
    return !auth.resumedUser || (auth.userInfo && (userType ? userType === auth.userInfo.userType : true));
}

export function useUserInfo() {
    const auth = useSelector(state => state.auth);
    return auth.resumedUser && auth.userInfo;
}