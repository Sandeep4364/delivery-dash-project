
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Parcel } from '@/types/parcel';

interface DashboardProps {
  parcels: Parcel[];
}

const Dashboard: React.FC<DashboardProps> = ({ parcels }) => {
  const stats = {
    total: parcels.length,
    pending: parcels.filter(p => p.status === 'Pending').length,
    inTransit: parcels.filter(p => p.status === 'In Transit').length,
    outForDelivery: parcels.filter(p => p.status === 'Out for Delivery').length,
    delivered: parcels.filter(p => p.status === 'Delivered').length,
    failed: parcels.filter(p => p.status === 'Failed').length
  };

  const cards = [
    {
      title: 'Total Parcels',
      value: stats.total,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'In Transit',
      value: stats.inTransit,
      icon: Truck,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Delivered',
      value: stats.delivered,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Failed',
      value: stats.failed,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card 
            key={card.title} 
            className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${card.bgColor} hover:scale-105`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${card.textColor}`}>
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.color}`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.textColor}`}>
                {card.value}
              </div>
              <p className={`text-xs ${card.textColor} opacity-70`}>
                {card.value === 1 ? 'parcel' : 'parcels'}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Dashboard;
