import Main from '@/app/tools/components/main';
import Heading from '@/components/heading';
import Aside from '../components/aside';
import GenerationForm from './components/generationForm';
import type { NextPage } from 'next';

const Page: NextPage = () => (
  <>
    <Main>
      <GenerationForm />
    </Main>

    <Aside>
      <Heading tag="h4">Refinement</Heading>
    </Aside>
  </>
);

export default Page;
