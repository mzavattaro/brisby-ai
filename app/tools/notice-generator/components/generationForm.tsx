import Input from '@/components/input';
import Button from '@/components/button';
import TextEditorOutput from './textEditorOutput';
import type { FC } from 'react';

const GeneratorForm: FC = () => (
  <>
    <div className="px-4 border-b">
      <form className="flex h-10 mb-4 items-center">
        <Input
          ariaLabel="Generate notice"
          type="text"
          name="text"
          id="text"
          showLabel={false}
          placeholder="Fire alarm inspection notice..."
          className="w-full mr-4"
        />
        <Button variant="primary" type="button">
          Generate
        </Button>
      </form>
    </div>

    <TextEditorOutput />
  </>
);

export default GeneratorForm;
