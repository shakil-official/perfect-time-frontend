import {useSelector, useDispatch} from 'react-redux'
import {decrement, increment} from './counterSlice'
import {useEffect} from "react";
import {fetchItems} from "@/features/counter/CounterService";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


export function Counter() {
    const {count, items} = useSelector((state) => state.counter)
    const dispatch = useDispatch()
    console.log(process.env.NEXT_PUBLIC_APP_API_BASE_URL)


    useEffect(() => {
        console.log("fetchItems ")
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