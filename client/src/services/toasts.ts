import { toast } from "react-toastify";

const success = (msg: string) => toast.success(msg);
const error = (msg: string) => toast.error(msg);
const warning = (msg: string) => toast.warn(msg);
const info = (msg: string) => toast.info(msg);

export { success, error, warning, info };
