import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const categories = {
  length: {
    label: 'Length',
    units: {
      m: { label: 'Meters', toBase: (v: number) => v, fromBase: (v: number) => v },
      km: { label: 'Kilometers', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
      cm: { label: 'Centimeters', toBase: (v: number) => v / 100, fromBase: (v: number) => v * 100 },
      mi: { label: 'Miles', toBase: (v: number) => v * 1609.34, fromBase: (v: number) => v / 1609.34 },
      ft: { label: 'Feet', toBase: (v: number) => v * 0.3048, fromBase: (v: number) => v / 0.3048 },
    },
  },
  weight: {
    label: 'Weight',
    units: {
      kg: { label: 'Kilograms', toBase: (v: number) => v, fromBase: (v: number) => v },
      g: { label: 'Grams', toBase: (v: number) => v / 1000, fromBase: (v: number) => v * 1000 },
      lb: { label: 'Pounds', toBase: (v: number) => v * 0.453592, fromBase: (v: number) => v / 0.453592 },
      oz: { label: 'Ounces', toBase: (v: number) => v * 0.0283495, fromBase: (v: number) => v / 0.0283495 },
    },
  },
  temperature: {
    label: 'Temperature',
    units: {
      c: {
        label: 'Celsius',
        toBase: (v: number) => v,
        fromBase: (v: number) => v,
      },
      f: {
        label: 'Fahrenheit',
        toBase: (v: number) => (v - 32) * (5 / 9),
        fromBase: (v: number) => v * (9 / 5) + 32,
      },
      k: {
        label: 'Kelvin',
        toBase: (v: number) => v - 273.15,
        fromBase: (v: number) => v + 273.15,
      },
    },
  },
} as const;

type CategoryKey = keyof typeof categories;

type UnitKey<C extends CategoryKey> = keyof typeof categories[C]['units'];

export default function UnitConverter() {
  const [category, setCategory] = useState<CategoryKey>('length');
  const [fromUnit, setFromUnit] = useState<UnitKey<'length'>>('m');
  const [toUnit, setToUnit] = useState<UnitKey<'length'>>('km');
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value as CategoryKey;
    setCategory(newCat);
    const firstUnit = Object.keys(categories[newCat].units)[0] as any;
    setFromUnit(firstUnit);
    setToUnit(firstUnit);
    setValue('');
    setResult('');
  };

  const convert = () => {
    if (value.trim() === '' || isNaN(Number(value))) return;
    const num = Number(value);
    const catConfig = categories[category];
    const fromConfig = (catConfig.units as any)[fromUnit];
    const toConfig = (catConfig.units as any)[toUnit];

    // Convert to base (SI) then to target
    const baseVal = fromConfig.toBase(num);
    const converted = toConfig.fromBase(baseVal);

    setResult(converted.toLocaleString(undefined, { maximumFractionDigits: 6 }));
  };

  const unitOptions = (cat: CategoryKey) =>
    Object.entries(categories[cat].units).map(([key, { label }]) => (
      <option key={key} value={key}>
        {label}
      </option>
    ));

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4" data-testid="unit-converter">
      <h1 className="text-2xl font-bold">Unit Converter</h1>

      <Card>
        <CardHeader>
          <CardTitle>Convert</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label>Category</label>
              <select
                className="w-full border rounded p-2"
                value={category}
                onChange={handleCategoryChange}
                data-testid="category-select"
              >
                {Object.entries(categories).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Value</label>
              <Input
                type="number"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                placeholder="Enter value"
                data-testid="value-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label>From</label>
              <select
                className="w-full border rounded p-2"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as any)}
                data-testid="from-select"
              >
                {unitOptions(category)}
              </select>
            </div>
            <div>
              <label>To</label>
              <select
                className="w-full border rounded p-2"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as any)}
                data-testid="to-select"
              >
                {unitOptions(category)}
              </select>
            </div>
          </div>

          <Button onClick={convert} data-testid="convert-btn">
            Convert
          </Button>

          {result && (
            <div data-testid="result" className="text-xl font-semibold">
              {value} {categories[category].units[fromUnit].label} = {result} {categories[category].units[toUnit].label}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}