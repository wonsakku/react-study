import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';


const useToast = () => {

    const [, setToastRerender] = useState(false);
    const toasts = useRef([]);

    const addToast = (toast) => {
        const id = uuidv4();
        const toastWithId = {
            ...toast,
            id
        }
        toasts.current = [...toasts.current, toastWithId];
        setToastRerender(prev => !prev);

        setTimeout(() => {
            deleteToast(id);
        }, 5000);
    }

    const deleteToast = (id) => {

        const filteredToasts = toasts.current.filter(toast => toast.id !== id);
        toasts.current = filteredToasts;
        setToastRerender(prev => !prev);
    }

    return [
        toasts.current,
        addToast,
        deleteToast
    ];
}

export default useToast;