import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Refinement from '../notice-generator/components/generation-tools/refinement';
import History from '../notice-generator/components/generation-tools/history';
import Metadata from '../notice-generator/components/generation-tools/metadata';
import type { FC } from 'react';

const SidebarContainer: FC = () => {
  const tabs = [
    { name: 'Refinement', component: <Refinement /> },
    { name: 'History', component: <History /> },
    { name: 'Metadata', component: <Metadata /> },
  ];

  return (
    <div className="w-full h-full">
      <Tabs defaultValue="Refinement" className="w-full px-8">
        <TabsList className="w-full">
          {tabs.map((tab) => (
            <TabsTrigger className="w-full" key={tab.name} value={tab.name}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.name} value={tab.name}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SidebarContainer;
