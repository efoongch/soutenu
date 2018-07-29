'use strict';

const e = React.createElement;

class GenerateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { generated: false };
  }

  render() {
    if (this.state.generated == true) {
      return 'Frappe to the front';
    }

    return e(
      'button',
      { onClick: () => this.setState({ generated: true }) },
      'Generate'
    );
  }
}




const domContainer = document.querySelector('#generate_button_container');
ReactDOM.render(e(GenerateButton), domContainer);