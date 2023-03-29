import { useParams } from "react-router-dom";

export function useActiveWrapper(): string {
  let { wrapper } = useParams<"wrapper">();
  
  wrapper = wrapper ?? "uniswap-v3";

  return wrapper;
}
