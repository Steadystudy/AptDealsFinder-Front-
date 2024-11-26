import { useCallback, useEffect, useRef } from 'react';
import Login from './Login';
import { useModalStore } from '../../zustand/showModal';
import SignUp from './SignUp';
import { Button } from '../ui/button';

interface ModalProps {
  show: boolean;
  version: 'login' | 'signup';
}

const Modal = ({ show, version }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { closeModal } = useModalStore();

  const modalOutSideClick = useCallback(
    (e: any) => {
      console.log(e.target, modalRef.current);
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    },
    [closeModal],
  );

  const handleCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    if (show) {
      window.addEventListener('mousedown', modalOutSideClick);
    }

    return () => window.removeEventListener('mousedown', modalOutSideClick);
  }, [show, modalOutSideClick]);

  return (
    <>
      {show && (
        <>
          <div className="fixed top-0 left-0 z-40 w-full h-full bg-[rgba(0,0,0,0.7)]"></div>
          <div
            ref={modalRef}
            className={`fixed top-[calc(50%-295px)] left-[calc(50%-255px)] z-50 w-[520px] min-h-[590px] mx-auto bg-white rounded-2xl animate-[modal]`}
            aria-modal="true"
            aria-hidden={!show}
          >
            <div className="flex justify-between p-4">
              <div>로고</div>
              <Button variant={'ghost'} onClick={handleCloseModal}>
                X
              </Button>
            </div>
            {version === 'login' ? <Login /> : <SignUp />}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
