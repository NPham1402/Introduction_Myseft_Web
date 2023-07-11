import { createContext } from "react";

export const ContextPosition = createContext(0);
export default function Context({ children }) {
  const [positionMenu, setPositionMenu] = useState(0);
  return (
    <ContextPosition.Provider
      value={{ positionMenum, setPositionMenu }}
      {...children}
    ></ContextPosition.Provider>
  );
}
