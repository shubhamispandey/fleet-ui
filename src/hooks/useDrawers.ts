import { toast } from "react-toastify";
import { NotifyProps } from "@/types";

const UseDrawers = () => {
  const notify = ({ message, type }: NotifyProps) => {
    (toast as any)[type](message);
  };

  return { notify };
};

export default UseDrawers;
