# react-digit-input

React hook to handle inputs with separated boxes for each digit.

 - [Live Demo](https://react-digit-input.forbeslindesay.co.uk/)
 - Demo source: [html](demo/index.html), [TypeScript](src/demo/client.tsx)

[![Build Status](https://img.shields.io/github/workflow/status/ForbesLindesay/react-digit-input/Test/master?style=for-the-badge)](https://github.com/ForbesLindesay/react-digit-input/actions?query=workflow%3ATest+branch%3Amaster)
[![Rolling Versions](https://img.shields.io/badge/Rolling%20Versions-Enabled-brightgreen?style=for-the-badge)](https://rollingversions.com/ForbesLindesay/react-digit-input)
[![NPM version](https://img.shields.io/npm/v/react-digit-input?style=for-the-badge)](https://www.npmjs.com/package/react-digit-input)

## Installation

```
npm install react-digit-input --save
```

## Usage

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useDigitInput from 'react-digit-input';

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
        <input inputMode="decimal" autoFocus {...digits[0]} />
        <input inputMode="decimal" {...digits[1]} />
        <input inputMode="decimal" {...digits[2]} />
        <span className="hyphen" />
        <input inputMode="decimal" {...digits[3]} />
        <input inputMode="decimal" {...digits[4]} />
        <input inputMode="decimal" {...digits[5]} />
      </div>
      <pre>
        <code>"{value}"</code>
      </pre>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## License

MIT
