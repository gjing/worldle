'use client';

import { Modal } from 'flowbite-react';
import Country from './Countries';

interface Props {
    openModal: boolean;
    setOpenModal: (arg0: boolean) => void;
    status: number;
    answer: Country;
}

export default function ResultsModal({openModal, setOpenModal, status, answer}: Props) {
  const HeaderMessages = ["", "Better luck next time!", "Correct!!"]

  const HeaderMessage = HeaderMessages[status];
  const answername = (answer.name.common == answer.name.official ? answer.name.common : answer.name.common + ' (' + answer.name.official + ')');

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{HeaderMessage}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Today's Country is {answername}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
