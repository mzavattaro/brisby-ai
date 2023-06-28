'use client';

import { useState } from 'react';
import GenerationTools from '../notice-generator/components/generation-tools/generationTools';
import SidebarTabs from './sidebarTabs';
import type { FC } from 'react';

const SidebarContainer: FC = () => {
  const [currentTab, setCurrentTab] = useState('Refinement');

  return (
    <div className="w-full h-full bg-red-200">
      <div className="px-3">
        <SidebarTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>

      <div className="px-6 pt-6">
        <GenerationTools currentTab={currentTab} />
      </div>
    </div>
  );
};

export default SidebarContainer;
