import React from 'react';
import { Button, Tooltip, ActionIcon } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function DeletePromotionButton({ pId, setError, currentPath, setPromotions }) {
  const navigate = useNavigate();

  async function deletePromotion(pId, setError) {
    try {
      const res = await fetch(`http://localhost:3000/promotions/${pId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        switch (res.status) {
          case 400:
            throw new Error(`Invalid request: ${errorData.error}`);
          case 401:
            localStorage.removeItem('access_token');
            navigate(`/login?returnTo=${currentPath}`, { replace: true });
            throw new Error('Your session has expired. Please log in again.');
          case 403:
            throw new Error('You do not have permission to delete this promotion.');
          case 404:
            throw new Error(errorData.error || 'Event not found.');
          default:
            throw new Error(errorData.error || 'Error deleting event.');
        }
      }
      setPromotions((prevPromotions) => prevPromotions.filter((promotion) => promotion.id !== pId));
      return true;
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Tooltip label="Delete Promotion">
      <ActionIcon 
        color="red" 
        size="lg" 
        variant="light"
        onClick={() => deletePromotion(pId, setError)}
      >
        <IconTrash size={18} />
      </ActionIcon>
    </Tooltip>
  );
}

export default DeletePromotionButton;