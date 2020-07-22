import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useDigitInput, {InputAttributes} from '../';

const DigitInputElement = React.forwardRef<
  HTMLInputElement,
  Omit<InputAttributes, 'ref'> & {
    autoFocus?: boolean;
  }
>(({...props}, ref) => {
  return (
    <label>
      <div className="digit">{props.value}</div>
      <hr />
      <input {...props} ref={ref} inputMode="decimal" />
    </label>
  );
});

function App() {
  const [value, onChange] = React.useState('');
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 6,
    value,
    onChange,
  });
  return (
    <div>
      <div className="input-group">
        <DigitInputElement autoFocus {...digits[0]} />
        <DigitInputElement {...digits[1]} />
        <DigitInputElement {...digits[2]} />
        <span className="hyphen" />
        <DigitInputElement {...digits[3]} />
        <DigitInputElement {...digits[4]} />
        <DigitInputElement {...digits[5]} />
      </div>
      <pre>
        <code>"{value}"</code>
      </pre>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
