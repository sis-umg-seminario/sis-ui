import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";

interface ErrorModalProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

export default function ErrorModal({ message, open, onClose }: ErrorModalProps) {
  return (
    <Modal open={open} title="Error" onClose={onClose}>
      <div className="flex flex-col items-center gap-3 text-center">
        <AlertTriangle className="text-red-500" size={48} />
        <p className="text-gray-800">{message}</p>
      </div>
    </Modal>
  );
}
