/**
 * Root reducer.
 * @module reducers/root
 */

import defaultReducers from '@plone/volto/reducers';

// import folder_header from '~/reducers/folder_header';
import folder_tabs from '~/reducers/folder_tabs';
import parent_folder_data from '~/reducers/parent_folder_data';
import localnavigation from '~/reducers/localnavigation';
import { sparql_data } from 'volto-datablocks/reducers';

const reducers = {
  ...defaultReducers,
  // Add your reducers here
  parent_folder_data,
  folder_tabs,
  localnavigation,
  sparql_data,
};

export default reducers;
