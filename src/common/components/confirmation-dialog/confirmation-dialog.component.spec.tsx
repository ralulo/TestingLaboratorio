import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialog', () => {
  it('should render correctly', () => {
    // Arrange
    const { getByText } = render(
      <ConfirmationDialogComponent
        isOpen={true}
        title="Test ConfirmationDialog"
        labels={{ closeButton: 'Close', acceptButton: 'Accept' }}
        onAccept={() => {}}
        onClose={() => {}}
      >
        Contenido de prueba
      </ConfirmationDialogComponent>
    );

    // Assert
    expect(getByText('Test ConfirmationDialog')).toBeInTheDocument();
    expect(getByText('Contenido de prueba')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
    expect(getByText('Accept')).toBeInTheDocument();
  });

  it('should call onClose and onAccept when the respective buttons are clicked', () => {
    // Arrange
    const mockOnClose = jest.fn();
    const mockOnAccept = jest.fn();

    const { getByText } = render(
      <ConfirmationDialogComponent
        isOpen={true}
        title="Test ConfirmationDialog"
        labels={{ closeButton: 'Close', acceptButton: 'Accept' }}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      >
        Contenido de prueba
      </ConfirmationDialogComponent>
    );

    // Act
    fireEvent.click(getByText('Close'));
    fireEvent.click(getByText('Accept'));

    // Assert
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnAccept).toHaveBeenCalled();
  });
});
