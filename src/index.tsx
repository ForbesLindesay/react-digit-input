import * as React from 'react';
import {useRef} from 'react';

export interface InputAttributes
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onKeyDown' | 'onChange'
  > {
  ref: (input: HTMLInputElement | null) => void;
}

export interface Options {
  acceptedCharacters: RegExp;
  length: number;
  value: string;
  onChange: (value: string) => void;
}

export default function useDigitInput({
  acceptedCharacters,
  length,
  value,
  onChange,
}: Options) {
  const val = padValue(value, length);
  const inputs = useRef<(HTMLInputElement | undefined)[]>(Array.from({length}));
  const inputRefSetters = useRef<InputAttributes['ref'][]>(
    Array.from({length}),
  );

  const props: InputAttributes[] = [];
  for (let i = 0; i < length; i++) {
    const ref = (inputRefSetters.current[i] =
      inputRefSetters.current[i] ||
      ((input) => {
        inputs.current[i] = input || undefined;
      }));
    const digitValue = val[i] === ' ' ? '' : val[i];

    props.push({
      ref,
      value: digitValue,
      onKeyDown: (e) => {
        switch (e.key) {
          case 'Backspace':
            e.preventDefault();
            if (!digitValue) {
              if (i > 0) {
                // this digit is empty, so backspace removes the previous digit
                // and focuses it
                onChange(val.substring(0, i - 1) + ' ' + val.substring(i));
                const previousInput = inputs.current[i - 1];
                if (previousInput) {
                  previousInput.focus();
                }
              }
            } else {
              // this digit is not empty, so backspace removes that digit
              onChange(val.substring(0, i) + ' ' + val.substring(i + 1));
            }
            break;
          case 'ArrowLeft':
            e.preventDefault();
            if (i > 0) {
              const previousInput = inputs.current[i - 1];
              if (previousInput) {
                previousInput.focus();
                window.requestAnimationFrame(() => {
                  previousInput.setSelectionRange(0, 1);
                });
              }
            }
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (i + 1 < length) {
              const nextInput = inputs.current[i + 1];
              if (nextInput) {
                nextInput.focus();
                window.requestAnimationFrame(() => {
                  nextInput.setSelectionRange(0, 1);
                });
              }
            }
            break;
          default:
            if (e.key.length === 1 && !(e.metaKey || e.altKey || e.ctrlKey)) {
              e.preventDefault();
              if (acceptedCharacters.test(e.key)) {
                onChange(val.substring(0, i) + e.key + val.substring(i + 1));
                if (i + 1 < length) {
                  const nextInput = inputs.current[i + 1];
                  if (nextInput) {
                    nextInput.focus();
                    window.requestAnimationFrame(() => {
                      nextInput.setSelectionRange(0, 0);
                    });
                  }
                }
              }
            }
        }
      },
      onChange: (e) => {
        const v = e.target.value
          .split('')
          .filter((c) => acceptedCharacters.test(c))
          .join('');
        onChange(
          (val.substring(0, i) + v + val.substring(i + v.length)).substr(
            0,
            length,
          ),
        );
        if (i < length - 1) {
          const nextInput =
            inputs.current[i + v.length < length ? i + v.length : length - 1];
          if (nextInput) {
            nextInput.focus();
            window.requestAnimationFrame(() => {
              nextInput.setSelectionRange(0, 0);
            });
          }
        }
      },
    });
  }
  return props;
}

function padValue(value: string, length: number) {
  while (value.length < length) {
    value += ' ';
  }
  return value.substr(0, length);
}
