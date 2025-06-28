
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Package, Plus } from 'lucide-react';
import { Parcel, ParcelSize } from '@/types/parcel';
import { toast } from 'sonner';

interface ParcelFormProps {
  onSubmit: (parcel: Omit<Parcel, 'id' | 'trackingId' | 'createdAt'>) => void;
}

const ParcelForm: React.FC<ParcelFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    contact: '',
    size: '' as ParcelSize | '',
    weight: '',
    status: 'Pending' as const,
    estimatedDelivery: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.address || !formData.contact || !formData.size || !formData.weight) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      onSubmit({
        customerName: formData.customerName,
        address: formData.address,
        contact: formData.contact,
        size: formData.size as ParcelSize,
        weight: parseFloat(formData.weight),
        status: formData.status,
        estimatedDelivery: formData.estimatedDelivery || undefined
      });

      // Reset form
      setFormData({
        customerName: '',
        address: '',
        contact: '',
        size: '',
        weight: '',
        status: 'Pending',
        estimatedDelivery: ''
      });

      toast.success('Parcel created successfully!');
    } catch (error) {
      toast.error('Failed to create parcel');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Create New Parcel</CardTitle>
            <CardDescription className="text-gray-600">
              Enter parcel details to generate a tracking ID
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="text-sm font-semibold text-gray-700">
                Customer Name *
              </Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="Enter customer name"
                className="border-gray-300 focus:border-primary focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-sm font-semibold text-gray-700">
                Contact Number *
              </Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                placeholder="Enter contact number"
                className="border-gray-300 focus:border-primary focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-semibold text-gray-700">
              Delivery Address *
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter complete delivery address"
              className="border-gray-300 focus:border-primary focus:ring-primary/20 min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Package Size *</Label>
              <Select
                value={formData.size}
                onValueChange={(value: ParcelSize) => setFormData(prev => ({ ...prev, size: value }))}
                required
              >
                <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary/20">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small">Small (up to 2kg)</SelectItem>
                  <SelectItem value="Medium">Medium (2-10kg)</SelectItem>
                  <SelectItem value="Large">Large (10kg+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-semibold text-gray-700">
                Weight (kg) *
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="0.0"
                className="border-gray-300 focus:border-primary focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDelivery" className="text-sm font-semibold text-gray-700">
                Est. Delivery
              </Label>
              <Input
                id="estimatedDelivery"
                type="date"
                value={formData.estimatedDelivery}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                className="border-gray-300 focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={isSubmitting}
          >
            <Plus className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Creating Parcel...' : 'Create Parcel'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ParcelForm;
