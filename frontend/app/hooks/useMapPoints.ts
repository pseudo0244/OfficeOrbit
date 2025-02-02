import { useState, useCallback, useEffect } from "react";

export function useMapPoints() {
  const [selectedFloorId, setSelectedFloorId] = useState<string | null>(null);

  // Load the selected floor ID from localStorage on initial render
  useEffect(() => {
    const savedFloorId = localStorage.getItem("selectedFloorId");
    if (savedFloorId) {
      setSelectedFloorId(savedFloorId);
    }
  }, []);

  // Function to handle floor selection and store the ID locally
  const selectFloor = useCallback((floorId: string) => {
    setSelectedFloorId(floorId);
    localStorage.setItem("selectedFloorId", floorId);
  }, []);

  return {
    selectedFloorId,
    selectFloor,
  };
}
