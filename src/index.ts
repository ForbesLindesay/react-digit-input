import * as React from 'react';
import {findDOMNode} from 'react-dom';

export interface InputAttributes
  extends Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      'value' | 'onKeyDown' | 'onChange'
    > {
  ref: (input: React.ReactInstance | null) => void;
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
function isHTMLTextAreaElement(
  element: Element,
): element is HTMLTextAreaElement {
  return element.tagName === 'TEXTAREA';
}
function isHTMLInputElement(element: Element): element is HTMLInputElement {
  return element.tagName === 'INPUT';
}
export default class DigitInput extends React.Component<DigitInputProps> {
  private _inputs: (React.ReactInstance | null | void)[] = [];
  private _getInput(i: number): HTMLTextAreaElement | HTMLInputElement | null {
    const input = this._inputs[i];
    if (input == null) {
      return null;
    }
    const element = findDOMNode(input);
    if (isHTMLTextAreaElement(element) || isHTMLInputElement(element)) {
      return element;
    }
    const innerElement = element.querySelector('textarea,input');
    if (
      innerElement &&
      (isHTMLTextAreaElement(innerElement) || isHTMLInputElement(innerElement))
    ) {
      return innerElement;
    }
    return null;
  }
  render() {
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
          const input = this._getInput(i);
          switch (e.key) {
            case 'Backspace':
              e.preventDefault();
              if (value[i] === ' ' || (input && input.selectionEnd === 0)) {
                if (i > 0) {
                  this.props.onChange(
                    value.substring(0, i - 1) + ' ' + value.substring(i),
                  );
                  const previousInput = this._getInput(i - 1);
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
              e.preventDefault();
              if (i > 0) {
                const previousInput = this._getInput(i - 1);
                if (previousInput) {
                  previousInput.focus();
                  window.requestAnimationFrame(() => {
                    (previousInput as HTMLInputElement).setSelectionRange(1, 1);
                  });
                }
              }
              break;
            case 'ArrowRight':
              e.preventDefault();
              if (i + 1 < this.props.length) {
                const nextInput = this._getInput(i + 1);
                if (nextInput) {
                  nextInput.focus();
                  window.requestAnimationFrame(() => {
                    (nextInput as HTMLInputElement).setSelectionRange(1, 1);
                  });
                }
              }
              break;
            default:
              if (e.key.length === 1 && !(e.metaKey || e.altKey || e.ctrlKey)) {
                e.preventDefault();
                if (this.props.acceptedCharacters.test(e.key)) {
                  this.props.onChange(
                    value.substring(0, i) + e.key + value.substring(i + 1),
                  );
                  if (i + 1 < this.props.length) {
                    const nextInput = this._getInput(i + 1);
                    if (nextInput) {
                      nextInput.focus();
                      window.requestAnimationFrame(() => {
                        (nextInput as HTMLInputElement).setSelectionRange(0, 0);
                      });
                    }
                  }
                }
              }
          }
        },
        onChange: e => {
          const v = e.target.value
            .split('')
            .filter(c => this.props.acceptedCharacters.test(c))
            .join('');
          this.props.onChange(
            (value.substring(0, i) + v + value.substring(i + v.length)).substr(
              0,
              this.props.length,
            ),
          );
          if (i < this.props.length - 1) {
            const nextInput = this._getInput(
              i + v.length < this.props.length
                ? i + v.length
                : this.props.length - 1,
            );
            if (nextInput) {
              nextInput.focus();
              window.requestAnimationFrame(() => {
                (nextInput as HTMLInputElement).setSelectionRange(0, 0);
              });
            }
          }
        },
      });
    }
    return this.props.children(props);
  }
}
module.exports = DigitInput;
module.exports.default = DigitInput;
