import React, { memo, useMemo, useEffect, useState } from 'react';
import {
  isOptimizedVault,
  isMultiStratVault,
  isVaultPaused,
  isVaultRetired,
  VaultEntity,
} from '../../../data/entities/vault';
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

import { CiVault, CiWallet, CiImport } from 'react-icons/ci';
import { style } from '@material-ui/system';
import { QuickDeposit } from './components/QuickDeposit';
import { VaultPlatform } from '../../../../components/VaultPlatform';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { StrategyDescription } from '../../../vault/components/StrategyCard/StrategyDescription';
import { formatPercent } from '../../../../helpers/format';

import shield from '../../../../components/Header/imgs/shield.svg';
import coin from '../../../../components/Header/imgs/coin.svg';
import blockchain from '../../../../components/Header/imgs/blockchain.svg';

const useStyles = makeStyles(styles);
const baseUrlAPI = 'https://api.coingecko.com/api/v3/simple/price';
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
export const VaultV3 = memo<VaultProps>(function Vault({ vaultId }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const isRetired = useAppSelector(state => selectIsVaultRetired(state, vaultId));
  const isGov = useAppSelector(state => selectIsVaultGov(state, vaultId));

  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const chain = useAppSelector(state => selectChainById(state, vault.chainId));
  const uris = useAssetsImageUris(vault.chainId, vault.assetIds);

  const [priceData, setPriceData] = useState({
    usd: 0,
    usd_24h_change: 0,
  });
  useEffect(() => {
    getPrices(vault.apiIds);
  }, []);
  const getPrices = async ids => {
    try {
      if (ids.length > 0) {
        const completeURL =
          baseUrlAPI + '?ids=' + ids.join() + '&vs_currencies=usd&include_24hr_change=true';
        const response = await fetch(completeURL);
        const jsonData = await response.json();
        var totalUsd = 0;
        var totalUsdChange = 0;
        for (let i = 0; i < ids.length; i++) {
          totalUsd += jsonData[Object.keys(jsonData)[i]].usd;
          totalUsdChange += jsonData[Object.keys(jsonData)[i]].usd_24h_change / 100;
        }
        setPriceData({
          usd: totalUsd / ids.length,
          usd_24h_change: formatPercent(totalUsdChange / ids.length),
        });
      }
    } catch (Ex) {}
  };

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
        <div className="wrapper">
          {uris.length > 1 ? (
            <>
              {uris.map((uri, i) =>
                uri ? (
                  <div className={classes.icon} data-count={uris.length}>
                    <img className="animatedToken" src={uri} key={uri} alt="" role="presentation" />
                  </div>
                ) : null
              )}
            </>
          ) : (
            <>
              <div className={classes.icon} data-count={uris.length}>
                {uris.map((uri, i) =>
                  uri ? (
                    <img className="animatedToken" src={uri} key={uri} alt="" role="presentation" />
                  ) : null
                )}
              </div>
            </>
          )}
        </div>
        <div className="card">
          <div className="image">
            <div className={classes.icon} data-count={uris.length}>
              {uris.map((uri, i) =>
                uri ? <img src={uri} key={uri} alt="" role="presentation" /> : null
              )}
            </div>
          </div>
          <div className="contentInit">
            {isVaultRetired(vault) || isVaultPaused(vault) ? null : (
              <VaultYearlyStat vaultId={vaultId} />
            )}
            <h2>{vault.name}</h2>
            {isVaultRetired(vault) ? (
              <VaultTag className={classes.vaultTagRetired}>{t('VaultTag-Retired')}</VaultTag>
            ) : isVaultPaused(vault) ? (
              <VaultTag className={classes.vaultTagPaused}>{t('VaultTag-Paused')}</VaultTag>
            ) : null}
            <VaultTag
              className={clsx(classes.vaultTagPlatform, classes[`vaultNetwork-${vault.chainId}`])}
            >
              {vault.chainId.toLocaleUpperCase()}
            </VaultTag>
          </div>
          <div className="content">
            <VaultYearlyStat vaultId={vaultId} />
            <i>
              Price Variation 24h (
              {priceData.usd_24h_change == 0 ? (
                <b>0%</b>
              ) : parseFloat(priceData.usd_24h_change.toString()) >= 0 ? (
                <b className="greenChart">+{priceData.usd_24h_change}</b>
              ) : (
                <b className="redChart">{priceData.usd_24h_change}</b>
              )}
              )
            </i>
            <div className="size">
              <h3>TVL :</h3>
              <div style={{ paddingLeft: '5px' }}>
                <VaultTvlStat vaultId={vaultId} />
              </div>
            </div>
            {isOptimizedVault(vault) ? (
              <>
                <img src={coin} className="menuIcon" />
                <VaultTag className={classes.vaultTagPlatform1}>Optimized Vault</VaultTag>
              </>
            ) : isMultiStratVault(vault) ? (
              <>
                <img src={blockchain} className="menuIcon" />
                <VaultTag className={classes.vaultTagPlatform1}>Multi-Strategies Vault</VaultTag>
              </>
            ) : (
              <>
                <img src={shield} className="menuIcon" />
                <VaultTag className={classes.vaultTagPlatform1}>Single-Exposure Vault</VaultTag>
              </>
            )}
            <VaultTag className={classes.vaultTagPlatform2}>
              <VaultPlatform vaultId={vaultId} />
            </VaultTag>
          </div>
        </div>
      </div>
    </Link>
  );
});
