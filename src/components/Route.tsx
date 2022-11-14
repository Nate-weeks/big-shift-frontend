import {FC} from "react";
import { Route } from "./Swap";

const RouteDisplay: FC<Route> = (props): JSX.Element => {
    return (
    <div style={{marginLeft:'20px'}}>
      <h1>{props.exchangeType}</h1>
      <p>{props.route}</p>
      <p>{props.output}</p>
    </div>
    )
  };
  
export default RouteDisplay;