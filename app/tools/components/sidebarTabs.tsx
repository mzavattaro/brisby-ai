import { clsx } from '@/lib/clsx';
import type { FC } from 'react';

type SidebarTabsProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

const SidebarTabs: FC<SidebarTabsProps> = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { name: 'Refinement', current: currentTab === 'Refinement' },
    { name: 'History', current: currentTab === 'History' },
    { name: 'Metadata', current: currentTab === 'Metadata' },
  ];

  const handlesSetCurrentTab = (tab: string) => {
    // Set the sidebar tab.
    setCurrentTab(tab);
  };

  return (
    <>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>

        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              type="button"
              onClick={() => handlesSetCurrentTab(tab.name)}
              key={tab.name}
              className={clsx(
                tab.current
                  ? 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:text-gray-800',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SidebarTabs;
