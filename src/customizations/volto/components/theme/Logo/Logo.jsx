/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Image } from 'semantic-ui-react';

import LogoImage from '~/components/theme/Logo/logo.svg';
import LogoImagePage from '~/components/theme/Logo/logo-page.svg';

const messages = defineMessages({
  site: {
    id: 'Site',
    defaultMessage: 'Site',
  },
  plonesite: {
    id: 'Plone Site',
    defaultMessage: 'Plone Site',
  },
});

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = ({ intl, isHomepage }) => (
  <Link
    className="logo-wrapper"
    to="/"
    title={intl.formatMessage(messages.site)}
  >
    <Image
      src={isHomepage === true ? LogoImage : LogoImagePage}
      alt={intl.formatMessage(messages.plonesite)}
      title={intl.formatMessage(messages.plonesite)}
      className={`${isHomepage === true ? '' : 'page-logo'}`}
    />
  </Link>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Logo.propTypes = {};

export default injectIntl(Logo);
