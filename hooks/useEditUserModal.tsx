import { create } from "zustand";

type EditUserModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useEditUserModal = create<EditUserModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditUserModal;
