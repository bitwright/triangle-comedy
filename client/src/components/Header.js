import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon, Button } from 'semantic-ui-react';
import logo from './logo.png';

class Header extends React.Component {
  _renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Menu.Item>
            <Button as='a' href='/oauth/google' color='red'>
              <Icon name='google' /> Login with Google
            </Button>
          </Menu.Item>
        );
      default:
        return (
          <Menu.Item href='/api/logout'>
            Logout &nbsp; <Icon name='log out' />
          </Menu.Item>
        );
    }
  }

  render() {
    return (
      <Menu stackable>
        <Menu.Item as={Link} to='/' header>
          <img src={logo} alt='logo' /> Triangle Comedy
        </Menu.Item>
        <Menu.Item as={Link} to='/venues'>Venues</Menu.Item>
        <Menu.Item as={Link} to='/shows'>Shows</Menu.Item>
        <Menu.Item as={Link} to='/mics'>Mics</Menu.Item>
        <Menu.Item as={Link} to='/classes'>Classes</Menu.Item>
        <Menu.Menu position='right'>
          { this._renderContent() }
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
