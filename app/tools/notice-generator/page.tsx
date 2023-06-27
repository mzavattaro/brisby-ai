import Main from '@/app/tools/components/main';
import Aside from '../components/aside';
import SidebarContainer from '../components/sidebarContainer';
import GenerationForm from './components/generationForm';
import type { NextPage } from 'next';

const Page: NextPage = () => (
  <>
    <Main>
      <GenerationForm />
    </Main>

    <Aside>
      <SidebarContainer />
    </Aside>
  </>
);

export default Page;
