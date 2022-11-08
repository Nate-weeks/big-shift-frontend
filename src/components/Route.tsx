import {FC} from "react";
import { Route } from "./Swap";

const RouteDisplay: FC<Route> = (props): JSX.Element => {
    return (
    <div>
      {props.exchangeType}
      {props.route}
      {props.output}
      {props.tokensName}
      {props.logosArray}
    </div>
    )
  };
  
export default RouteDisplay;