export type AuthModalType = 'login' | 'register' | 'change password' | 'verify' | null;

export interface AuthModalProps {
  modalType: AuthModalType;
  onClose: () => void;
  // A function that takes the new type and updates the parent
  onSwitch: (newType: AuthModalType) => void;
  onLoginSuccess: (userData : any, token : string) => void;
}