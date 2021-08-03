import { useSelector } from "react-redux";

 function Currency  ({value}) {
    const currency = useSelector((state) => state.currency);
  
    return currency + value;
}

export default Currency;