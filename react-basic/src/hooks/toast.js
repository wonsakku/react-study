import { v4 as uuidv4 } from 'uuid';
import { addToast as add, removeToast } from '../store/toastSlice';
import { useDispatch } from 'react-redux';


const useToast = () => {

    const dispatch = useDispatch();

    const addToast = (toast) => {
        const id = uuidv4();
        const toastWithId = {
            ...toast,
            id
        }

        dispatch(add(toastWithId));
        // toasts.current = [...toasts.current, toastWithId];
        // setToastRerender(prev => !prev);

        setTimeout(() => {
            deleteToast(id);
        }, 5000);
    }

    const deleteToast = (id) => {

        // const filteredToasts = toasts.current.filter(toast => toast.id !== id);
        // toasts.current = filteredToasts;
        // setToastRerender(prev => !prev);

        dispatch(removeToast(id));
    }

    return {
        addToast,
        deleteToast
    };
}

export default useToast;