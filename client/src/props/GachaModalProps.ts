export type GachaModalType = 'pull' | 'pull history' | 'rates' | 'error' |null;

export interface GachaModalProps {
  modalType: GachaModalType;
  extMessage: string;
  onClose: () => void;
  items: string[];
}