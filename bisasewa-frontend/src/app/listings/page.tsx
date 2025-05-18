'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Listing {
  _id: string;
  title: string;
  description: string;
  pricePerDay: number;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    apiFetch<Listing[]>('/listings')
      .then(setListings)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Barang Tersedia</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listings.map((item) => (
          <div key={item._id} className="border rounded p-4 shadow">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p>{item.description}</p>
            <p className="text-sm text-gray-600">{item.pricePerDay} / hari</p>
          </div>
        ))}
      </div>
    </div>
  );
}
