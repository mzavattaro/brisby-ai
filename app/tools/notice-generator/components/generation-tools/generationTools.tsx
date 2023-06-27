import Heading from '@/components/heading';
import Refinement from './refinement';
import History from './history';
import Metadata from './metadata';
import type { FC } from 'react';

type GenerationToolsProps = {
  currentTab: string;
};

const GenerationTools: FC<GenerationToolsProps> = ({ currentTab }) => {
  const tools = [
    {
      name: 'Refinement',
      current: currentTab === 'Refinement',
      component: <Refinement />,
    },
    {
      name: 'History',
      current: currentTab === 'History',
      component: <History />,
    },
    {
      name: 'Metadata',
      current: currentTab === 'Metadata',
      component: <Metadata />,
    },
  ];

  return (
    <>
      {tools.map((tool) => (
        <div key={tool.name}>
          {tool.current ? (
            <div>
              <Heading tag="h4">{tool.name}</Heading>
              {tool.name === currentTab && tool.component}
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default GenerationTools;
