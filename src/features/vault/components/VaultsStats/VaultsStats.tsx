import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Box, Divider, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { isGovVault, isRewardableVault, VaultEntity } from '../../../data/entities/vault';
import {
  selectVaultById,
  selectVaultStrategyLastHarvest,
  selectVaultStrategyPendingBounty,
  selectVaultStrategyCallFee,
  selectVaultStrategyVaultFee,
  selectVaultStrategyDenominatorFee,
} from '../../../data/selectors/vaults';
import { DailyApyStats, YearlyApyStats } from '../../../../components/ApyStats';
import { ValueBlock } from '../../../../components/ValueBlock/ValueBlock';
import { VaultTvl } from '../../../../components/VaultTvl/VaultTvl';
import { VaultDeposited } from '../../../../components/VaultDeposited/VaultDeposited';
import { GovVaultRewards } from '../../../../components/GovVaultRewards/GovVaultRewards';
import { getBeefyApi } from '../../../data/apis/instances';
import { useAppSelector } from '../../../../store';
import { selectChainNativeToken, selectTokenPriceByAddress } from '../../../data/selectors/tokens';
import { formatBigDecimals, formatBigUsd, formatPercent } from '../../../../helpers/format';
import { AssetsImage } from '../../../../components/AssetsImage';
import { BountyWithBalance } from '../BountyWithBalance';
import BigNumber from 'bignumber.js';

const useStyles = makeStyles(styles);
var intervalStarted = false;
var beefyState;
const baseUrlAPI = 'https://api.coingecko.com/api/v3/simple/price';

function VaultsStatsComponent({ vaultId }: { vaultId: VaultEntity['id'] }) {
  const lastHarvestStr = useLastHarvestStr(vaultId);
  const classes = useStyles();
  const { t } = useTranslation();
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  //console.log(vault);
  const native = useAppSelector(state => selectChainNativeToken(state, vault.chainId));

  const [rewardPriceData, setRewardPriceData] = useState({
    usd: 0,
    usd_24h_change: 0,
  });
  useEffect(() => {
    if (vault.pendingRewards != null) {
      getPrices([vault.pendingRewards]);
    }
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
        setRewardPriceData({
          usd: totalUsd / ids.length,
          usd_24h_change: formatPercent(totalUsdChange / ids.length),
        });
      }
    } catch (Ex) {}
  };

  const nativeUsd = useAppSelector(state =>
    selectTokenPriceByAddress(state, vault.chainId, native.address)
  );
  useAppSelector(state => (beefyState = state));

  const [pendingCompound, setPendingCompound] = useState(new BigNumber(0));

  const callFee = useAppSelector(state => selectVaultStrategyCallFee(state, vaultId));
  const vaultFee = useAppSelector(state => selectVaultStrategyVaultFee(state, vaultId));
  const denominatorFee = useAppSelector(state => selectVaultStrategyDenominatorFee(state, vaultId));

  intervalStarted = false;

  useEffect(() => {
    if (!intervalStarted) {
      // Display for the first time
      var pendingBounty = selectVaultStrategyPendingBounty(beefyState, vaultId);
      setPendingCompound(pendingBounty == null ? new BigNumber(0) : pendingBounty);
      setInterval(() => {
        // Updates display every 3 second
        const pendingBounty = selectVaultStrategyPendingBounty(beefyState, vaultId);
        setPendingCompound(pendingBounty == null ? new BigNumber(0) : pendingBounty);
      }, 1000);
      intervalStarted = true;
    }
  });

  return (
    <div className={classes.container}>
      <div className={classes.interestStats}>
        <Box className={classes.interestStatsBox}>
          <Box width={'25%'} className={classes.stat3}>
            <VaultTvl vaultId={vaultId} />
          </Box>
          <Box className={classes.stat}>
            <Divider className={classes.divider} orientation="vertical" />
            <Box className={classes.stat3}>
              <YearlyApyStats vaultId={vault.id} />
            </Box>
          </Box>
          <Box className={classes.stat}>
            <Divider className={classes.divider} orientation="vertical" />
            <Box className={classes.stat3}>
              <DailyApyStats vaultId={vault.id} />
            </Box>
          </Box>
          {isRewardableVault(vault) ? (
            <Box className={classes.stat}>
              <Divider className={classes.divider} orientation="vertical" />
              <Box className={classes.stat3}>
                <ValueBlock
                  label={t('Pending-Verb')}
                  value={formatBigUsd(
                    pendingCompound
                      .multipliedBy(denominatorFee)
                      .dividedBy(callFee)
                      .multipliedBy(denominatorFee)
                      .div(vaultFee)
                      .multipliedBy(vault.pendingRewards == null ? nativeUsd : rewardPriceData.usd)
                  )}
                  usdValue={null}
                />
              </Box>
            </Box>
          ) : null}
        </Box>
      </div>
      <div className={classes.depositStats}>
        <Grid container className={classes.depositStatsBox}>
          <Grid item xs={6} className={classes.stat1}>
            <Box className={classes.stat4}>
              <VaultDeposited vaultId={vaultId} />
            </Box>
          </Grid>
          {(isGovVault(vault) || lastHarvestStr !== 'never') && (
            <Divider flexItem={true} className={classes.divider1} orientation="vertical" />
          )}
          {!isGovVault(vault) ? (
            <>
              {lastHarvestStr !== 'never' && (
                <Grid item xs={6}>
                  <Box className={classes.stat4}>
                    <ValueBlock label={t('Vault-LastHarvest')} value={lastHarvestStr} />
                  </Box>
                </Grid>
              )}
            </>
          ) : (
            <Grid item xs={6}>
              <Box className={classes.stat4}>
                <GovVaultRewards vaultId={vaultId} />
              </Box>
            </Grid>
          )}
          {!isGovVault(vault) ? (
            <Divider flexItem={true} className={classes.divider1} orientation="vertical" />
          ) : null}
          {!isGovVault(vault) && isRewardableVault(vault) ? (
            <>
              <Grid item xs={6}>
                <Box className={classes.stat4}>
                  <ValueBlock
                    label={t('Compound-Verb')}
                    value={
                      <BountyWithBalance
                        token={native}
                        vaultId={vaultId}
                        balance={
                          vault.pendingRewards == null
                            ? pendingCompound
                            : pendingCompound.dividedBy(nativeUsd).multipliedBy(rewardPriceData.usd)
                        }
                      />
                    }
                    tooltip={{
                      content: t('Compound-Text'),
                    }}
                  />
                </Box>
              </Grid>
            </>
          ) : null}
        </Grid>
      </div>
    </div>
  );
}

export const VaultsStats = React.memo(VaultsStatsComponent);

const useLastHarvestStr = (vaultId: string) => {
  const [state, setState] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const lastHarvestBigNumber = selectVaultStrategyLastHarvest(beefyState, vaultId);
      if (lastHarvestBigNumber == null || lastHarvestBigNumber == new BigNumber(0)) {
        setState('never');
      } else {
        const lastHarvest = new Date(parseInt(lastHarvestBigNumber.toString()) * 1000);
        const lhStr = moment(lastHarvest)
          .fromNow()
          .replace(' hours', 'h')
          .replace(' minutes', 'm')
          .replace(' days', 'd');

        setState(lhStr);
      }
    })();
  }, [vaultId]);

  return state;
};
