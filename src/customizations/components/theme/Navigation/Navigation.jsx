/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isMatch } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Menu } from 'semantic-ui-react';
import cx from 'classnames';
import { getBaseUrl } from '@plone/volto/helpers';
import { BodyClass } from '@plone/volto/helpers';
import rightKey from '@plone/volto/icons/right-key.svg';
import backIcon from '@plone/volto/icons/back.svg';
import { Icon } from '@plone/volto/components';

import { getNavigation } from '@plone/volto/actions';

import bgimage from './home.jpg';

const messages = defineMessages({
  closeMobileMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openMobileMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
});

class Navigation extends Component {
  static propTypes = {
    getNavigation: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.isMobile = this.isMobile.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.setSubmenu = this.setSubmenu.bind(this);
    this.setSubtopics = this.setSubtopics.bind(this);
    this.state = {
      isMobileMenuOpen: false,
      subMenu: {
        type: null,
        items: [],
      },
      subTopics: {
        type: null,
        items: [],
      },
      isMobile: false,
    };
  }

  componentWillMount() {
    this.props.getNavigation(getBaseUrl(this.props.pathname), 3);
  }

  componentDidMount() {
    document.addEventListener('resize', this.isMobile);
    this.isMobile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.closeMobileMenu()
      this.props.getNavigation(getBaseUrl(nextProps.pathname), 3);
    }
  }

  isMobile() {
    if (!window) return;
    if (window.matchMedia('(max-width: 900px)').matches) {
      this.setState({ isMobile: !this.state.isMobile });
    } else {
      this.setState({ isMobile: this.state.isMobile });
    }
  }

  setSubmenu(title, items) {
    const body = document.querySelector('body');
    if (this.state.subMenu.type === title) {
      body.classList.remove('menu-open-homepage');
      this.setState({
        subMenu: {
          type: null,
          items: [],
        },
        subTopics: {
          type: null,
          items: [],
        },
      });
    } else {
      body.classList.add('menu-open-homepage');
      this.setState({
        subMenu: {
          type: title,
          items: items,
        },
        subTopics: {
          type: null,
          items: [],
        },
      });
    }
  }

  setSubtopics(title, items) {
    this.setState({
      subTopics: {
        type: title,
        items: items,
      },
    });
  }

  isActive(url) {
    return (
      (url === '' && this.props.pathname === '/') ||
      (url !== '' && isMatch(this.props.pathname.split('/'), url.split('/')))
    );
  }

  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  }

  closeMobileMenu() {
    if (!this.state.isMobileMenuOpen) {
      return;
    }
    this.setState({ isMobileMenuOpen: false });
  }

  render() {
    return (
      <div id="app-menu-content">
        <BodyClass className="homepage" />

        <div
          id="menu-background"
          className="background-img"
          style={{ backgroundImage: `url(${bgimage})` }}
        />
        <div
          id="menu-background-overlay"
          onClick={() => this.setSubmenu(this.state.subMenu.type, [])}
        />
        <div className="hamburger-wrapper mobile tablet only">
          <button
            className={cx('hamburger hamburger--collapse', {
              'is-active': this.state.isMobileMenuOpen,
            })}
            aria-label={
              this.state.isMobileMenuOpen
                ? this.props.intl.formatMessage(messages.closeMobileMenu, {
                  type: this.props.type,
                })
                : this.props.intl.formatMessage(messages.openMobileMenu, {
                  type: this.props.type,
                })
            }
            title={
              this.state.isMobileMenuOpen
                ? this.props.intl.formatMessage(messages.closeMobileMenu, {
                  type: this.props.type,
                })
                : this.props.intl.formatMessage(messages.openMobileMenu, {
                  type: this.props.type,
                })
            }
            type="button"
            onClick={this.toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
        <div
          className={cx('main-menu', {
            'menu-open': this.state.isMobileMenuOpen,
          })}
        >
          <div
            onClick={() => this.setSubmenu(this.state.subMenu.type, [])}
            className="menu-underlay"
          />
          <div className="first-level">
            {this.props.items.map((item, index) => (
              <div
                key={item.url}
                className={
                  this.isActive(item.url) ? 'menu-item active' : 'menu-item'
                }
              >
                {item.items && item.items.length ? (
                  <a
                    role="button"
                    onClick={ev =>
                      this.setSubmenu(item.title, item.items, ev)
                    }
                    onKeyPress={() => { }}
                  >
                    {this.state.subMenu.type === item.title && (
                      <Icon
                        className="menu-indicator"
                        name={rightKey}
                        size="30px"
                      />
                    )}

                    {item.title}
                  </a>
                ) : (
                  <Link to={item.url} key={item.url}>
                    {item.title}
                  </Link>
                  )}
              </div>
            ))}
          </div>
          {this.state.subMenu.items && this.state.subMenu.items.length ? (
            <div className="second-level">
              <Icon
                name={backIcon}
                onClick={() => this.setSubmenu(this.state.subMenu.type, [])}
                className="mobile-back-button"
              />
              {this.state.subMenu.items.map(item => (
                <div
                  key={item.url}
                  className={
                    this.isActive(item.url) ? 'menu-item active' : 'menu-item'
                  }
                >
                  {item.items && item.items.length ? (
                    <a
                      role="button"
                      onClick={ev =>
                        this.setSubtopics(item.title, item.items, ev)
                      }
                      onKeyPress={() => { }}
                    >
                      {this.state.subTopics.type === item.title && (
                        <Icon
                          className="menu-indicator"
                          name={rightKey}
                          size="30px"
                        />
                      )}
                      {item.title}
                    </a>
                  ) : (
                      <Link to={item.url} key={item.url}>
                        {item.title}
                      </Link>
                    )}
                </div>
              ))}
            </div>
          ) : (
              <div />
            )}
          {this.state.subTopics.items && this.state.subTopics.items.length ? (
            <div className="third-level">
              <Icon
                name={backIcon}
                onClick={() => this.setSubtopics(null, [])}
                className="mobile-back-button"
              />
              <h2 style={{ fontWeight: 600 }}>
                <i>{this.state.subTopics.type}</i>
              </h2>
              <p style={{ fontWeight: 100 }} className="mb-5">
                Subtopics
              </p>
              {this.state.subTopics.items.map(item => (
                <div
                  key={item.url}
                  className={
                    this.isActive(item.url) ? 'menu-item active' : 'menu-item'
                  }
                >
                  <Link
                    to={(item.url = item.items ? item.items[0].url : item.url)}
                    key={item.url}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
              ''
            )}
        </div>
      </div>
    );
  }
}
export default compose(
  injectIntl,
  connect(
    state => ({
      items: state.navigation.items,
    }),
    { getNavigation },
  ),
)(Navigation);
