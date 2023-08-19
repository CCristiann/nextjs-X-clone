import { create } from "zustand";

type FormModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useFormModal = create<FormModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFormModal;
