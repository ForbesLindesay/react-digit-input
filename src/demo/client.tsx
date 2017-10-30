import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DigitInput from '../';

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
