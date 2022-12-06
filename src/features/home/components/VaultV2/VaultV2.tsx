import React, { memo, useMemo } from 'react';
import { isVaultPaused, isVaultRetired, VaultEntity } from '../../../data/entities/vault';
import { makeStyles } from '@material-ui/core';
import { styles } from './styles';
import {
  selectIsVaultGov,
  selectIsVaultRetired,
  selectVaultById,
} from '../../../data/selectors/vaults';
import clsx from 'clsx';
import { useAppSelector } from '../../../../store';
import { Link } from 'react-router-dom';
import './stylesCss.css';
import { useTranslation } from 'react-i18next';
import { selectChainById } from '../../../data/selectors/chains';
import { getSingleAssetSrc } from '../../../../helpers/singleAssetSrc';
import { ChainEntity } from '../../../data/entities/chain';
import { VaultTvlStat } from '../Vault/components/VaultStats/VaultTvlStat';
import { VaultYearlyStat } from '../Vault/components/VaultStats/VaultYearlyStat';
import { VaultDailyStat } from '../Vault/components/VaultStats/VaultDailyStat';
import { VaultDepositStat } from '../Vault/components/VaultStats/VaultDepositStat';
import { VaultWalletAmount } from '../../../../components/VaultWalletAmount/VaultWalletAmount';
import { VaultNetwork } from '../Vault/components/VaultIdentity';
import { VaultTag } from '../Vault/components/VaultTags/VaultTag';
import { VaultIcon } from '../Vault/components/VaultIcon';

const useStyles = makeStyles(styles);

const maxSupportedAssets = 8;

function useAssetsImageUris(chainId: ChainEntity['id'], assetIds: string[]) {
  return useMemo(() => {
    return assetIds
      .slice(0, maxSupportedAssets)
      .map(assetId => getSingleAssetSrc(assetId, chainId));
  }, [assetIds, chainId]);
}

export type VaultProps = {
  vaultId: VaultEntity['id'];
};
export const VaultV2 = memo<VaultProps>(function Vault({ vaultId }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const isRetired = useAppSelector(state => selectIsVaultRetired(state, vaultId));
  const isGov = useAppSelector(state => selectIsVaultGov(state, vaultId));

  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const chain = useAppSelector(state => selectChainById(state, vault.chainId));
  const uris = useAssetsImageUris(vault.chainId, vault.assetIds);

  return (
    <Link
      to={`/vault/${vaultId}`}
      className={clsx({
        [classes.vault]: true,
        [classes.vaultRetired]: isRetired,
        [classes.vaultEarnings]: isGov,
      })}
    >
      <div className="container">
        <div className="card">
          <VaultNetwork chainId={vault.chainId} />
          <div className="imgBx">
            <VaultIcon vaultId={vaultId} />
            {/*uris.map((uri, i) =>
              uri ? (
                <img
                  src={uri}
                  key={uri}
                />
              ) : null
              )*/}
          </div>
          <div className="contentBx">
            <h2>
              <VaultYearlyStat vaultId={vaultId} />
            </h2>
            {isVaultRetired(vault) ? (
              <VaultTag className={classes.vaultTagRetired}>{t('VaultTag-Retired')}</VaultTag>
            ) : isVaultPaused(vault) ? (
              <VaultTag className={classes.vaultTagPaused}>{t('VaultTag-Paused')}</VaultTag>
            ) : null}
            <h2>{vault.name}</h2>

            <div className="size">
              <h3>Daily :</h3>
              <VaultDailyStat vaultId={vaultId} />
            </div>
            <div className="size">
              <h3>TVL :</h3>
              <VaultTvlStat vaultId={vaultId} />
            </div>
            <div className="size">
              <h3>Deposited :</h3>
              <VaultDepositStat vaultId={vaultId} />
            </div>
            <div className="size">
              <h3>Wallet :</h3>
              <VaultWalletAmount vaultId={vaultId} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});
