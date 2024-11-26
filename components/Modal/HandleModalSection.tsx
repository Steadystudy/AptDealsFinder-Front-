'use client';

import { useModalStore } from '../../zustand/showModal';
import Modal from './Modal';

export default function HandleModalSection() {
  const { version, isOpen } = useModalStore();
  return (
    <>
      <Modal version={version} show={isOpen} />
    </>
  );
}
