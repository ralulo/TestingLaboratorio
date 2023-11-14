import React from 'react';
import { createEmptyLookup, Lookup } from '../../models/lookup';

export const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(createEmptyLookup());

  return {
    isOpen,
    itemToDelete,
    onAccept: () => {
      setItemToDelete(createEmptyLookup());
    },
    onClose: () => setIsOpen(false),

    onOpenDialog: (item: Lookup | null | undefined) => {
      setIsOpen(true);
      item ? setItemToDelete(item) : setItemToDelete(createEmptyLookup());
    },
  };
};

