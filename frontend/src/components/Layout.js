import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';

import Navbar from 'components/Navbar';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="page-container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.array
};
