import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Box, Divider, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { isGovVault, VaultEntity } from '../../../data/entities/vault';
import {
  selectVaultById,
  selectVaultStrategyLastHarvest,
  selectVaultStrategyPendingBounty,
} from '../../../data/selectors/vaults';
import { DailyApyStats, YearlyApyStats } from '../../../../components/ApyStats';
import { ValueBlock } from '../../../../components/ValueBlock/ValueBlock';
import { VaultTvl } from '../../../../components/VaultTvl/VaultTvl';
import { VaultDeposited } from '../../../../components/VaultDeposited/VaultDeposited';
import { GovVaultRewards } from '../../../../components/GovVaultRewards/GovVaultRewards';
import { getBeefyApi } from '../../../data/apis/instances';
import { useAppSelector } from '../../../../store';
import { selectChainNativeToken, selectTokenPriceByAddress } from '../../../data/selectors/tokens';
import { formatBigDecimals, formatBigUsd } from '../../../../helpers/format';
import { AssetsImage } from '../../../../components/AssetsImage';
import { BountyWithBalance } from '../BountyWithBalance';
import BigNumber from 'bignumber.js';

const useStyles = makeStyles(styles);
var intervalStarted = false;
var beefyState;

function VaultsStatsComponent({ vaultId }: { vaultId: VaultEntity['id'] }) {
  const lastHarvestStr = useLastHarvestStr(vaultId);
  const classes = useStyles();
  const { t } = useTranslation();
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  //console.log(vault);
  const native = useAppSelector(state => selectChainNativeToken(state, vault.chainId));
  const nativeUsd = useAppSelector(state =>
    selectTokenPriceByAddress(state, vault.chainId, native.address)
  );
  useAppSelector(state => (beefyState = state));

  const [pendingCompound, setPendingCompound] = useState(new BigNumber(0));

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
          <Box className={classes.stat}>
            <Divider className={classes.divider} orientation="vertical" />
            <Box className={classes.stat3}>
              <ValueBlock
                label={t('Pending-Verb')}
                value={formatBigUsd(
                  new BigNumber(1000000)
                    .dividedBy(111)
                    .multipliedBy(pendingCompound)
                    .dividedBy(45)
                    .multipliedBy(nativeUsd)
                )}
                usdValue={null}
              />
            </Box>
          </Box>
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
          {!isGovVault(vault) ? (
            <>
              {lastHarvestStr !== 'never' && (
                <Grid item xs={6}>
                  <Box className={classes.stat4}>
                    <ValueBlock
                      label={t('Compound-Verb')}
                      value={
                        <BountyWithBalance
                          token={native}
                          vaultId={vaultId}
                          balance={pendingCompound}
                        />
                      }
                      tooltip={{
                        content: t('Compound-Text'),
                      }}
                    />
                  </Box>
                </Grid>
              )}
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
