import Main from '@/app/tools/components/main';
import Editor from '@/components/editor';
import Aside from '../components/aside';
import SidebarContainer from '../components/sidebarContainer';
import type { NextPage } from 'next';

const Page: NextPage = () => (
  <>
    <Main>
      <Editor />
    </Main>

    <Aside>
      <SidebarContainer />
    </Aside>
  </>
);

export default Page;
