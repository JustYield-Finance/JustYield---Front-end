import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  selectFilteredVaults,
  selectLpsFilteredVaults,
  selectSingleFilteredVaults,
} from '../../../../../data/selectors/filtered-vaults';
import { NoResults } from '../NoResults';
import { VirtualVaultsList } from '../VirtualVaultsList';
import { styles } from './styles';
import { useAppSelector } from '../../../../../../store';

const useStyles = makeStyles(styles);

type VaultTypeProps = {
  vaultType?: string;
};

export const VaultsList = memo<VaultTypeProps>(function VaultsList({ vaultType }) {
  const vaultIds = useAppSelector(selectFilteredVaults);
  const singleVaultIds = useAppSelector(selectSingleFilteredVaults);
  const lpsVaultIds = useAppSelector(selectLpsFilteredVaults);
  const classes = useStyles();

  return (
    <div className={classes.vaultsList}>
      {vaultIds.length === 0 ? <NoResults /> : null}
      {
        <VirtualVaultsList vaultIds={vaultIds} />
        /*vaultType === 'single' ?
        <VirtualVaultsList vaultIds={singleVaultIds} /> :
        (
          vaultType === 'lps' ? 
          <VirtualVaultsList vaultIds={lpsVaultIds} /> :
          <VirtualVaultsList vaultIds={vaultIds} />
        )*/
      }
    </div>
  );
});
