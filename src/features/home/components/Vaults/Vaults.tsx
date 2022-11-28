import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import { styles } from './styles';
import { VaultsHeader } from './components/VaultsHeader';
import { VaultsList } from './components/VaultsList';

const useStyles = makeStyles(styles);

type VaultTypeProps = {
  vaultType?: string;
};

export const Vaults = memo<VaultTypeProps>(function Vaults({
  vaultType,
}) {
  const classes = useStyles();

  return (
    <div className={classes.vaults}>
      <VaultsHeader />
      <VaultsList vaultType={vaultType} />
    </div>
  );
});
