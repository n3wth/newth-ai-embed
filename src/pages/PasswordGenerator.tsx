import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DEFAULT_LENGTH = 12;

function getRandomChar(charset: string) {
  const randomIndex = Math.floor(Math.random() * charset.length);
  return charset[randomIndex];
}

function generatePassword(
  length: number,
  useLower: boolean,
  useUpper: boolean,
  useNumbers: boolean,
  useSymbols: boolean
) {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  let charPool = '';
  if (useLower) charPool += lower;
  if (useUpper) charPool += upper;
  if (useNumbers) charPool += numbers;
  if (useSymbols) charPool += symbols;

  if (!charPool) {
    throw new Error('Please select at least one character set');
  }

  let password = '';
  for (let i = 0; i < length; i += 1) {
    password += getRandomChar(charPool);
  }
  return password;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(DEFAULT_LENGTH);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    try {
      const pwd = generatePassword(length, useLower, useUpper, useNumbers, useSymbols);
      setPassword(pwd);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
    } catch {
      // ignore copy errors
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4" data-testid="password-generator">
      <h1 className="text-2xl font-bold mb-4">Password Generator</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="length">Length: {length}</label>
          <input
            type="range"
            id="length"
            min={4}
            max={50}
            step={1}
            value={length}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLength(Number(e.target.value))}
            className="w-full"
            data-testid="length-slider"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id="lower"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
            />
            Lowercase
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id="upper"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
            />
            Uppercase
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id="numbers"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
            />
            Numbers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id="symbols"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
            />
            Symbols
          </label>
        </div>

        {error && <p className="text-red-500" data-testid="error-message">{error}</p>}

        <Button onClick={handleGenerate} data-testid="generate-btn">Generate</Button>

        <div>
          <label htmlFor="password">Generated Password</label>
          <div className="flex gap-2 mt-1">
            <Input
              id="password"
              value={password}
              readOnly
              className="flex-1"
              data-testid="password-output"
            />
            <Button variant="secondary" onClick={handleCopy} disabled={!password} data-testid="copy-btn">
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}