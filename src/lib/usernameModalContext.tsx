import { createContext, useContext, useState } from 'react';

type UsernameModalContextType = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

const UsernameModalContext = createContext<UsernameModalContextType | undefined>(undefined);

export const UseUsernameModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <UsernameModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </UsernameModalContext.Provider>
  );
};

export const useUsernameModal = () => {
  const context = useContext(UsernameModalContext);
  if (context === undefined) {
    throw new Error('useUsernameModal must be used within a UsernameModalProvider');
  }
  return context;
};