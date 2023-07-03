import IconTooltip from './iconTooltip';
import type { FC, ChangeEvent } from 'react';

type RangeSliderProps = {
  min: string;
  max: string;
  defaultValue: string;
  step: string;
  rangeValue: string;
  setRangeValue: (value: string) => void;
};

const RangeSlider: FC<RangeSliderProps> = ({
  min,
  max,
  defaultValue,
  step,
  rangeValue,
  setRangeValue,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(event.target.value);
  };

  return (
    <>
      <div className="flex items-center">
        <label
          htmlFor="steps-range"
          className="block mb-1 text-sm font-medium mr-2"
        >
          Temperature
        </label>
        <IconTooltip heading="Tip">
          <p className="text-xs leading-5">
            A lower temperature means BrisbyAI will take fewer risks and notices
            will be more accurate and deterministic. Increasing it will result
            in more diverse notices.
          </p>
          <p className="text-xs leading-5 font-bold mt-2">Default: 0</p>
        </IconTooltip>
      </div>

      <div className="flex items-center">
        <input
          id="steps-range"
          type="range"
          min={min}
          max={max}
          defaultValue={defaultValue}
          step={step}
          aria-label="Range steps"
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer mr-4"
          onChange={handleInputChange}
        />
        <span className="w-8 text-center">{rangeValue}</span>
      </div>
    </>
  );
};

export default RangeSlider;
