export type ProfileModalType = 'change password' | 'subscription cancellation' | null

export interface ProfileModalProps {
  profileModalType: ProfileModalType;
  onClose: () => void;
  onChangePasswordSuccess: () => void;
  onRemoveSubscription: () => void;
}