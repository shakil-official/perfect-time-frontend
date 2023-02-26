import axios from "axios";
import {setError, setItems} from "@/features/counter/counterSlice";


// fetch all items
export const fetchItems = () => {
    return async (dispatch) => {
        axios.get("https://reqres.in/api/users?page=2")
            .then((response) => {
                console.log(response.data.data)
                dispatch(setItems(response.data.data));
            })
            .catch((er) => {
                dispatch(setError());
            });
    };
}

export const itemsSelector = (state) => state;
