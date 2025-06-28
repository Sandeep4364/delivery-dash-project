
import { useState, useEffect } from 'react';
import { Parcel, ParcelStatus } from '@/types/parcel';

export const useParcels = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);

  // Load parcels from localStorage on mount
  useEffect(() => {
    const savedParcels = localStorage.getItem('parcels');
    if (savedParcels) {
      setParcels(JSON.parse(savedParcels));
    } else {
      // Add some demo data
      const demoParcels: Parcel[] = [
        {
          id: '1',
          trackingId: 'TRK001234567',
          customerName: 'John Smith',
          address: '123 Main Street, New York, NY 10001',
          contact: '+1-555-0123',
          size: 'Medium',
          weight: 2.5,
          status: 'In Transit',
          createdAt: '2024-01-15',
          estimatedDelivery: '2024-01-18'
        },
        {
          id: '2',
          trackingId: 'TRK001234568',
          customerName: 'Sarah Johnson',
          address: '456 Oak Avenue, Los Angeles, CA 90210',
          contact: '+1-555-0124',
          size: 'Small',
          weight: 0.8,
          status: 'Delivered',
          createdAt: '2024-01-14',
          estimatedDelivery: '2024-01-17'
        },
        {
          id: '3',
          trackingId: 'TRK001234569',
          customerName: 'Mike Davis',
          address: '789 Pine Road, Chicago, IL 60601',
          contact: '+1-555-0125',
          size: 'Large',
          weight: 15.2,
          status: 'Pending',
          createdAt: '2024-01-16',
          estimatedDelivery: '2024-01-20'
        }
      ];
      setParcels(demoParcels);
      localStorage.setItem('parcels', JSON.stringify(demoParcels));
    }
  }, []);

  // Save to localStorage whenever parcels change
  useEffect(() => {
    localStorage.setItem('parcels', JSON.stringify(parcels));
  }, [parcels]);

  const addParcel = (parcelData: Omit<Parcel, 'id' | 'trackingId' | 'createdAt'>) => {
    const newParcel: Parcel = {
      id: Date.now().toString(),
      trackingId: `TRK${Date.now().toString().slice(-9)}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...parcelData
    };

    setParcels(prev => [newParcel, ...prev]);
    return newParcel;
  };

  const updateParcelStatus = (id: string, status: ParcelStatus) => {
    setParcels(prev => 
      prev.map(parcel => 
        parcel.id === id ? { ...parcel, status } : parcel
      )
    );
  };

  const deleteParcel = (id: string) => {
    setParcels(prev => prev.filter(parcel => parcel.id !== id));
  };

  return {
    parcels,
    addParcel,
    updateParcelStatus,
    deleteParcel
  };
};
