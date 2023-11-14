import { renderHook, act } from '@testing-library/react-hooks';
import {useConfirmationDialog} from './confirmation-dialog.hook';
import { Lookup, createEmptyLookup } from '../../models/lookup';

describe('useConfirmationDialog', () => {
  it('should return the correct initial values', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    const emptyLookup = createEmptyLookup();

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toMatchObject(emptyLookup);

    expect(result.current.onAccept()).toBeUndefined()
    expect(result.current.onClose()).toBeUndefined();
    expect(result.current.onOpenDialog(emptyLookup)).toBeUndefined();
  });

  it('should update itemToDelete the when use onAccept', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    const item: Lookup = {id: "1", name: 'test'} ;

    // Act
    act(() => {
      result.current.itemToDelete= item;
      result.current.onAccept();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('should update state to close when use onClose', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    // Act
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('should create empty Lookup when onOpendialog item is null or undefined ', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    const item: Lookup = undefined ;

    // Act
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.itemToDelete).toMatchObject(createEmptyLookup());
  });

  it('should update setItem and isOpen when call onOpenDialog', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    const item: Lookup = {id: "1", name: 'test'} ;

    // Act
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toMatchObject(item);
  });
});
