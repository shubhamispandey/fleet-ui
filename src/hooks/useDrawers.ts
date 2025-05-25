import { toast } from "react-toastify";
import { NotifyProps } from "@/types";

const UseDrawers = () => {
  const notify = ({ message, type }: NotifyProps) => {
    toast[type](message);
  };

  return { notify };
};

export default UseDrawers;
