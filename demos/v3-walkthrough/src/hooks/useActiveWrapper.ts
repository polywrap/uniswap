import { useParams } from "react-router-dom";

export function useActiveWrapper(): string {
  let { wrapper } = useParams<"wrapper">();
  
  wrapper = wrapper ?? "account-abstraction";

  return wrapper;
}
