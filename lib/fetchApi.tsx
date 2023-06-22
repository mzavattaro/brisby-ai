import { currentUser } from '@clerk/nextjs';
import type { ReactElement } from 'react';

const FetchApi = async (): Promise<ReactElement> => {
  const user = await currentUser();

  return (
    <>
      <h2>Fetch API</h2>
      <pre>{user?.id}</pre>
    </>
  );
};
export default FetchApi;
