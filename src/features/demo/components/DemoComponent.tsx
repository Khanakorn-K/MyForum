'use client';

import React from 'react';
import { useDemo } from '../hooks/useDemo';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';

export const DemoComponent = () => {
  const { data, loading } = useDemo();

  if (loading) {
    return <div className="p-4">Loading demo feature...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Demo Items</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.message}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">ID: {item.id}</p>
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(item.timestamp).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {data?.length === 0 && (
        <p className="text-center text-gray-500">No items found.</p>
      )}
    </div>
  );
};
