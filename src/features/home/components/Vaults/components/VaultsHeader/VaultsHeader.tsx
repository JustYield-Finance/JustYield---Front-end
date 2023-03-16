import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import { styles } from './styles';
import { VaultsSearch } from '../VaultsSearch';
import { VaultsSort } from '../VaultsSort';
import { Filters } from '../../../Filters';

const useStyles = makeStyles(styles);

export const VaultsHeader = memo(function VaultsHeader() {
  const classes = useStyles();

  return (
    <div className="container-lg">
      <div className="row">
        <div className="col">
          <VaultsSearch />
        </div>
        <div className="col">
          <Filters />
        </div>
        <div className="col">
          <VaultsSort />
        </div>
      </div>
      {/*
      <div className={classes.header}>
        <VaultsSearch />
        <Filters />
        <VaultsSort />
      </div>
      */}
    </div>
  );
});
