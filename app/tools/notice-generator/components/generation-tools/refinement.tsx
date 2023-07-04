'use client';

import { useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Slider } from '@/components/ui/slider';
import Heading from '@/components/heading';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FC } from 'react';

const Refinement: FC = () => {
  const [rangeValueChange, setRangeValueChange] = useState([0]);
  const [rangeValueCommit, setRangeValueCommit] = useState([0]);

  const tonalities = ['Colloquial', 'Neutral', 'Formal'];
  const lengths = ['Short', 'Medium', 'Long'];
  const frequencies = ['Low', 'Medium', 'High'];

  return (
    <>
      <Heading tag="h6" className="mb-3">
        AI response settings
      </Heading>

      <div className="mb-4">
        <div className="flex">
          <label
            htmlFor="notice-tonality"
            className="block text-sm font-medium mr-2 mb-1"
          >
            Tonality
          </label>
          <HoverCard openDelay={300}>
            <HoverCardTrigger>
              <QuestionMarkCircleIcon className="w-5 h-5 cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-xs leading-5">
                A lower temperature means BrisbyAI will take fewer risks.
                Notices will be more accurate and deterministic. Increasing the
                temperature will result in more diverse notices.
              </p>
              <p className="text-xs leading-5 font-bold mt-2">Default: 0</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <Select defaultValue="Neutral">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {tonalities.map((tone) => (
              <SelectItem key={tone} value={tone}>
                {tone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex">
          <label
            htmlFor="notice-length"
            className="block text-sm font-medium mr-2 mb-1"
          >
            Length
          </label>
          <HoverCard openDelay={300}>
            <HoverCardTrigger>
              <QuestionMarkCircleIcon className="w-5 h-5 cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-xs leading-5">
                A lower temperature means BrisbyAI will take fewer risks.
                Notices will be more accurate and deterministic. Increasing the
                temperature will result in more diverse notices.
              </p>
              <p className="text-xs leading-5 font-bold mt-2">Default: 0</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <Select defaultValue="Medium">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {lengths.map((length) => (
              <SelectItem key={length} value={length}>
                {length}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="-mx-8 border-b border-b-slate-200 mt-6 mb-4" />

      <Heading tag="h6">Advanced settings</Heading>
      {/* Tempature slider */}
      <div className="mb-6">
        <div className="flex items-center place-content-between mb-2">
          <div className="flex">
            <label
              htmlFor="steps-range"
              className="block text-sm font-medium mr-2"
            >
              Temperature
            </label>
            <HoverCard openDelay={300}>
              <HoverCardTrigger>
                <QuestionMarkCircleIcon className="w-5 h-5 cursor-pointer" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-xs leading-5">
                  A lower temperature means BrisbyAI will take fewer risks.
                  Notices will be more accurate and deterministic. Increasing
                  the temperature will result in more diverse notices.
                </p>
                <p className="text-xs leading-5 font-bold mt-2">Default: 0</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <span className="w-8 text-center">{rangeValueChange}</span>
        </div>
        <Slider
          name="temperature"
          defaultValue={[0]}
          max={2}
          step={0.1}
          onValueChange={(value) => setRangeValueChange(value)}
          onValueCommit={(value) => setRangeValueCommit(value)}
        />
      </div>

      <div>
        <div className="flex">
          <label
            htmlFor="word-frequency"
            className="block text-sm font-medium mr-2 mb-1"
          >
            Word frequency
          </label>
          <HoverCard openDelay={300}>
            <HoverCardTrigger>
              <QuestionMarkCircleIcon className="w-5 h-5 cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-xs leading-5">
                A lower temperature means BrisbyAI will take fewer risks.
                Notices will be more accurate and deterministic. Increasing the
                temperature will result in more diverse notices.
              </p>
              <p className="text-xs leading-5 font-bold mt-2">Default: 0</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <Select defaultValue="Low">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {frequencies.map((frequency) => (
              <SelectItem key={frequency} value={frequency}>
                {frequency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Refinement;
