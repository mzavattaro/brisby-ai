'use client';

import { useState } from 'react';
import RangerSlider from '@/components/rangeSlider';
import type { FC } from 'react';

const Refinement: FC = () => {
  const [rangeValue, setRangeValue] = useState('0');

  return (
    <>
      <span>Advanced settings</span>

      <RangerSlider
        min="0"
        max="2"
        step="0.1"
        defaultValue="0"
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
      />
    </>
  );
};

export default Refinement;
