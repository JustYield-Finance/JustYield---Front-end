import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  selectFilteredVaults,
  selectSingleFilteredVaults,
  selectMultiFilteredVaults,
  selectOptimizedFilteredVaults,
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
  const multiVaultIds = useAppSelector(selectMultiFilteredVaults);
  const optiVaultIds = useAppSelector(selectOptimizedFilteredVaults);
  const classes = useStyles();

  return (
    <div className={classes.vaultsList}>
      {vaultIds.length === 0 ? <NoResults /> : null}
      {vaultType === 'single' ? (
        singleVaultIds.length > 0 ? (
          <VirtualVaultsList vaultIds={singleVaultIds} />
        ) : (
          <NoResults />
        )
      ) : vaultType === 'multi' ? (
        multiVaultIds.length > 0 ? (
          <VirtualVaultsList vaultIds={multiVaultIds} />
        ) : (
          <NoResults />
        )
      ) : vaultType === 'optimized' ? (
        optiVaultIds.length > 0 ? (
          <VirtualVaultsList vaultIds={optiVaultIds} />
        ) : (
          <VirtualVaultsList vaultIds={vaultIds} />
        )
      ) : (
        <VirtualVaultsList vaultIds={vaultIds} />
      )}
    </div>
  );
});
