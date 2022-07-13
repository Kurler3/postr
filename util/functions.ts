import { toast } from "react-toastify";

// GET RANDOM ITEM FROM ARRAY
export const GET_RANDOM_ITEM = (array: any[]) => {
    return array.at(Math.floor(Math.random() * array.length));
}

// DISPLAY SUCCESS TOAST
export const displaySuccessToast = (message: string) => {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
    });
}