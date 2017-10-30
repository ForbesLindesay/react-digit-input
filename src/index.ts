import * as React from 'react';

export interface InputAttributes
  extends Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      'value' | 'onKeyDown' | 'onChange'
    > {
  ref: (input: HTMLInputElement | null) => void;
}
export interface DigitInputProps {
  acceptedCharacters: RegExp;
  length: number;
  value: string;
  children: (
    props: InputAttributes[],
  ) =>
    | JSX.Element
    | JSX.Element[]
    | React.ReactPortal
    | string
    | number
    | null
    | false;
  onChange: (value: string) => any;
}
export default class DigitInput extends React.Component<DigitInputProps> {
  private _inputs: (HTMLInputElement | null)[] = [];
  render():
    | JSX.Element
    | JSX.Element[]
    | React.ReactPortal
    | string
    | number
    | null
    | false {
    let value = this.props.value;
    while (value.length < this.props.length) {
      value += ' ';
    }
    value = value.substr(0, this.props.length);
    const props: InputAttributes[] = [];
    for (let i = 0; i < this.props.length; i++) {
      props.push({
        ref: element => (this._inputs[i] = element),
        value: value[i] === ' ' ? '' : value[i],
        onKeyDown: e => {
          const input = this._inputs[i];
          switch (e.key) {
            case 'Backspace':
              if (value[i] === ' ' || (input && input.selectionEnd === 0)) {
                if (i > 0) {
                  this.props.onChange(
                    value.substring(0, i - 1) + ' ' + value.substring(i),
                  );
                  const previousInput = this._inputs[i - 1];
                  if (previousInput) {
                    previousInput.focus();
                  }
                }
              } else {
                this.props.onChange(
                  value.substring(0, i) + ' ' + value.substring(i + 1),
                );
              }
              break;
            case 'ArrowLeft':
              if (i > 0) {
                const previousInput = this._inputs[i - 1];
                if (previousInput) {
                  previousInput.focus();
                  window.requestAnimationFrame(() => {
                    previousInput.setSelectionRange(1, 1);
                  });
                }
              }
              break;
            case 'ArrowRight':
              if (i + 1 < this.props.length) {
                const nextInput = this._inputs[i + 1];
                if (nextInput) {
                  nextInput.focus();
                  window.requestAnimationFrame(() => {
                    nextInput.setSelectionRange(1, 1);
                  });
                }
              }
              break;
            default:
              if (
                e.key.length === 1 &&
                this.props.acceptedCharacters.test(e.key)
              ) {
                this.props.onChange(
                  value.substring(0, i) + e.key + value.substring(i + 1),
                );
                if (i + 1 < this.props.length) {
                  const nextInput = this._inputs[i + 1];
                  if (nextInput) {
                    nextInput.focus();
                    window.requestAnimationFrame(() => {
                      nextInput.setSelectionRange(0, 0);
                    });
                  }
                }
              }
          }
        },
        onChange: e => {},
      });
    }
    return this.props.children(props) as any;
  }
}
module.exports = DigitInput;
module.exports.default = DigitInput;
