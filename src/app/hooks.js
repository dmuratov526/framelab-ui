import { useDispatch, useSelector } from "react-redux";

// кастомные хуки для чистоты импорта
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;