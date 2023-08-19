import { create } from "zustand";

type LoginModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useLoginModal = create<LoginModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
