
export interface Parcel {
  id: string;
  trackingId: string;
  customerName: string;
  address: string;
  contact: string;
  size: 'Small' | 'Medium' | 'Large';
  weight: number;
  status: 'Pending' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Failed';
  createdAt: string;
  estimatedDelivery?: string;
}

export type ParcelStatus = Parcel['status'];
export type ParcelSize = Parcel['size'];
