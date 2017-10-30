# react-digit-input

[![Greenkeeper badge](https://badges.greenkeeper.io/ForbesLindesay/react-digit-input.svg)](https://greenkeeper.io/)

Higher Order Component for passcode/separated digit input.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/react-digit-input/master.svg)](https://travis-ci.org/ForbesLindesay/react-digit-input)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/react-digit-input/master.svg)](http://david-dm.org/ForbesLindesay/react-digit-input)
[![NPM version](https://img.shields.io/npm/v/react-digit-input.svg)](https://www.npmjs.org/package/react-digit-input)

## Installation

```
npm install react-digit-input --save
```

## Usage

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DigitInput from 'react-digit-input';

interface State {
  value: string;
}
class App extends React.Component<{}, State> {
  state = {value: ''};
  render() {
    return (
      <DigitInput
        acceptedCharacters={/^[0-9]$/}
        length={6}
        value={this.state.value}
        onChange={value => this.setState({value})}
      >
        {props => (
          <div className="input-group">
            <input type="tel" {...props[0]} />
            <input type="tel" {...props[1]} />
            <input type="tel" {...props[2]} />
            <span className="hyphen" />
            <input type="tel" {...props[3]} />
            <input type="tel" {...props[4]} />
            <input type="tel" {...props[5]} />
          </div>
        )}
      </DigitInput>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## License

MIT
