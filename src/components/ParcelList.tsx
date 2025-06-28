
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Package, Edit, Trash2, Eye, MapPin, Calendar, Weight } from 'lucide-react';
import { Parcel, ParcelStatus } from '@/types/parcel';
import { toast } from 'sonner';

interface ParcelListProps {
  parcels: Parcel[];
  onUpdateStatus: (id: string, status: ParcelStatus) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'In Transit': 'bg-blue-100 text-blue-800 border-blue-200',
  'Out for Delivery': 'bg-purple-100 text-purple-800 border-purple-200',
  'Delivered': 'bg-green-100 text-green-800 border-green-200',
  'Failed': 'bg-red-100 text-red-800 border-red-200'
};

const sizeIcons = {
  'Small': '📦',
  'Medium': '📮',
  'Large': '🗳️'
};

const ParcelList: React.FC<ParcelListProps> = ({ parcels, onUpdateStatus, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ParcelStatus | 'All'>('All');

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = 
      parcel.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || parcel.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (id: string, newStatus: ParcelStatus) => {
    onUpdateStatus(id, newStatus);
    toast.success(`Parcel status updated to ${newStatus}`);
  };

  const handleDelete = (id: string, customerName: string) => {
    if (window.confirm(`Are you sure you want to delete the parcel for ${customerName}?`)) {
      onDelete(id);
      toast.success('Parcel deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Parcel Management</h2>
              <p className="text-gray-600 text-sm font-normal">
                {filteredParcels.length} of {parcels.length} parcels
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by tracking ID, customer name, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-primary focus:ring-primary/20"
              />
            </div>
            
            <Select
              value={statusFilter}
              onValueChange={(value: ParcelStatus | 'All') => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-primary focus:ring-primary/20">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Parcels Grid */}
      <div className="grid gap-6">
        {filteredParcels.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Parcels Found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'All' ? 'Try adjusting your search filters' : 'Create your first parcel to get started'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredParcels.map((parcel) => (
            <Card 
              key={parcel.id} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-gradient-to-r hover:from-white hover:to-blue-50"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Section - Main Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sizeIcons[parcel.size]}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{parcel.customerName}</h3>
                          <Badge className={`${statusColors[parcel.status]} border`}>
                            {parcel.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded inline-block">
                          {parcel.trackingId}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{parcel.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Weight className="h-4 w-4" />
                        <span>{parcel.weight}kg ({parcel.size})</span>
                      </div>
                      {parcel.estimatedDelivery && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(parcel.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:min-w-[200px]">
                    <Select
                      value={parcel.status}
                      onValueChange={(value: ParcelStatus) => handleStatusUpdate(parcel.id, value)}
                    >
                      <SelectTrigger className="w-full border-gray-300 focus:border-primary focus:ring-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Transit">In Transit</SelectItem>
                        <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-gray-300 hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-gray-300 hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(parcel.id, parcel.customerName)}
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ParcelList;
