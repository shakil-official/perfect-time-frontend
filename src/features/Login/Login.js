import {useSelector, useDispatch} from 'react-redux'
import {decrement, increment} from './loginSlice'
import {useEffect} from "react";
import {fetchItems} from "@/features/counter/CounterService";


export function Login() {
    const {count, items} = useSelector((state) => state.counter)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchItems());
    }, []);


    console.log(items)

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}