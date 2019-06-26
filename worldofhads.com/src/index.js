import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: {
        darkmode: true,
      },
    }
  }

  setTheme() {
    if (this.state.themes.darkmode) {
      document.documentElement.style.setProperty('--background-color', 'black');
      document.documentElement.style.setProperty('--h1-color', 'white');
      return;
    }

    document.documentElement.style.setProperty('--background-color', 'white');
    document.documentElement.style.setProperty('--h1-color', 'black');
  }

  lightdark = () => {
    this.setState(prevState => ({
      themes: {
        darkmode: !prevState.themes.darkmode
      }
    }));
  }

  render() {
    this.setTheme();

    return (
      <div className="index">
        <h1>Wellcome to world of hads!</h1>
        <button onClick={this.lightdark}>Light|dark mode</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
