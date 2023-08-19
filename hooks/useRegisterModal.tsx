import { create } from "zustand";

type RegisterModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useRegisterModal = create<RegisterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
