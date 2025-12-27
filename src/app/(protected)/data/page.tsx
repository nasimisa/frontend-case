import { CropTable } from '@/features/CropTable';
import { Suspense } from 'react';

export default function DataPage() {
  return (
    <Suspense fallback={null}>
      <CropTable />
    </Suspense>
  );
}
