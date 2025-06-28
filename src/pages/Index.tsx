
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Package, BarChart3, Plus, Truck } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import ParcelForm from '@/components/ParcelForm';
import ParcelList from '@/components/ParcelList';
import { useParcels } from '@/hooks/useParcels';
import { toast } from 'sonner';

const Index = () => {
  const { parcels, addParcel, updateParcelStatus, deleteParcel } = useParcels();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleCreateParcel = (parcelData: Parameters<typeof addParcel>[0]) => {
    const newParcel = addParcel(parcelData);
    console.log('New parcel created:', newParcel);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ParcelDash</h1>
                <p className="text-sm text-gray-600">Professional Parcel Management System</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setActiveTab('create')}
              className="bg-gradient-to-r from-accent to-orange-500 hover:from-orange-500 hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Parcel
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto h-12 bg-white shadow-lg border border-gray-200">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="parcels" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Parcels</span>
            </TabsTrigger>
            <TabsTrigger 
              value="create" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
              <p className="text-gray-600 mb-8">Monitor your parcel delivery operations in real-time</p>
              <Dashboard parcels={parcels} />
            </div>
          </TabsContent>

          <TabsContent value="parcels" className="space-y-8">
            <ParcelList 
              parcels={parcels}
              onUpdateStatus={updateParcelStatus}
              onDelete={deleteParcel}
            />
          </TabsContent>

          <TabsContent value="create" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Parcel</h2>
              <p className="text-gray-600">Add a new parcel to the delivery system</p>
            </div>
            <ParcelForm onSubmit={handleCreateParcel} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 ParcelDash. Professional Parcel Management System.</p>
            <p className="text-sm mt-2">Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
