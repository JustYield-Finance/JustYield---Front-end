import {
  Box,
  Button,
  FormControlLabel,
  InputBase,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import { isArray } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AssetsImage } from '../../../../components/AssetsImage';
import { useStepper } from '../../../../components/Steps/hooks';
import { Step } from '../../../../components/Steps/types';
import { formatBigNumberSignificant, formatBigUsd } from '../../../../helpers/format';
import { initWithdrawForm } from '../../../data/actions/scenarios';
import { askForNetworkChange, askForWalletConnection } from '../../../data/actions/wallet';
import { walletActions } from '../../../data/actions/wallet-actions';
import { TokenEntity } from '../../../data/entities/token';
import { isGovVault, VaultEntity } from '../../../data/entities/vault';
import { withdrawActions } from '../../../data/reducers/wallet/withdraw';
import {
  selectBoostUserBalanceInToken,
  selectGovVaultPendingRewardsInToken,
  selectGovVaultUserStackedBalanceInDepositToken,
  selectStandardVaultUserBalanceInDepositTokenIncludingBoosts,
  selectUserBalanceOfToken,
} from '../../../data/selectors/balance';
import {
  selectBoostById,
  selectIsVaultPreStakedOrBoosted,
  selectPastBoostIdsWithUserBalance,
  selectPreStakeOrActiveBoostIds,
  selectShouldDisplayBoostWidget,
} from '../../../data/selectors/boosts';
import { selectChainById } from '../../../data/selectors/chains';
import { selectIsAddressBookLoaded } from '../../../data/selectors/data-loader';
import {
  selectChainNativeToken,
  selectChainWrappedNativeToken,
  selectErc20TokenByAddress,
  selectTokenByAddress,
  selectTokenPriceByAddress,
} from '../../../data/selectors/tokens';
import {
  selectVaultById,
  selectVaultStrategyPendingBounty,
  selectVaultStrategyCallFee,
  selectVaultStrategyVaultFee,
  selectVaultStrategyDenominatorFee,
} from '../../../data/selectors/vaults';
import {
  selectCurrentChainId,
  selectIsWalletConnected,
  selectIsWalletKnown,
  selectWalletAddress,
} from '../../../data/selectors/wallet';
import { selectIsApprovalNeededForWithdraw } from '../../../data/selectors/wallet-actions';
import { BoostWidget } from '../BoostWidget';
import { ZapBreakdown } from '../ZapBreakdown';
import { styles } from '../styles';
import { TokenWithDeposit } from '../TokenWithDeposit';
import { EmeraldGasNotice } from '../EmeraldGasNotice/EmeraldGasNotice';
import { useAppDispatch, useAppSelector, useAppStore } from '../../../../store';
import { ScreamAvailableLiquidity } from '../ScreamAvailableLiquidity';
import { BIG_ZERO } from '../../../../helpers/big-number';
import { ZapPriceImpact, ZapPriceImpactProps } from '../ZapPriceImpactNotice';
import { isFulfilled } from '../../../data/reducers/data-loader-types';
import { FeeBreakdown } from '../FeeBreakdown';
import { BountyWithBalance } from '../BountyWithBalance';

const useStyles = makeStyles(styles);

var beefyState;
var intervalStarted = false;

export const Bounty = ({ vaultId }: { vaultId: VaultEntity['id'] }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const store = useAppStore();
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const isWalletConnected = useAppSelector(selectIsWalletConnected);
  const isWalletOnVaultChain = useAppSelector(
    state => selectCurrentChainId(state) === vault.chainId
  );
  const walletAddress = useAppSelector(state =>
    selectIsWalletKnown(state) ? selectWalletAddress(state) : null
  );
  const [priceImpactDisableWithdraw, setPriceImpactDisableWithdraw] = useState(false);

  // initialize our form
  React.useEffect(() => {
    initWithdrawForm(store, vaultId, walletAddress);
    // reset form on unmount
    return () => {
      store.dispatch(withdrawActions.resetForm());
    };
  }, [store, vaultId, walletAddress]);

  const chain = useAppSelector(state => selectChainById(state, vault.chainId));
  const depositToken = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );
  const earnedToken = useAppSelector(state =>
    selectErc20TokenByAddress(state, vault.chainId, vault.earnedTokenAddress, true)
  );
  const formState = useAppSelector(state => state.ui.withdraw);
  const wnative = useAppSelector(state =>
    selectIsAddressBookLoaded(state, vault.chainId)
      ? selectChainWrappedNativeToken(state, vault.chainId)
      : null
  );

  const spenderAddress = formState.isZap
    ? formState.zapOptions?.address || null
    : // if it's a classic vault, the vault contract address is the spender
      // which is also the earned token
      vault.earnContractAddress;

  // no approval when retrieving the vault LP
  const isWithdrawingLP =
    formState.selectedToken &&
    !isArray(formState.selectedToken) &&
    formState.selectedToken.address === depositToken.address;

  const needsApproval = useAppSelector(state =>
    formState.vaultId && spenderAddress && !isWithdrawingLP
      ? selectIsApprovalNeededForWithdraw(state, spenderAddress)
      : false
  );

  const formDataLoaded = useAppSelector(
    state =>
      isFulfilled(state.ui.dataLoader.byChainId[vault.chainId].addressBook) &&
      isFulfilled(state.ui.dataLoader.global.withdrawForm)
  );

  const isZapEstimateLoading = formState.isZap && !formState.zapEstimate;
  const [startStepper, isStepping, Stepper] = useStepper(chain.id);

  const formReady = true; //formDataLoaded && !isStepping && !isZapEstimateLoading;

  const hasGovVaultRewards = useAppSelector(state =>
    selectGovVaultPendingRewardsInToken(state, vaultId).isGreaterThan(0)
  );
  // TODO: this could be a selector or hook
  const userHasBalanceInVault = useAppSelector(state => {
    const deposit = isGovVault(vault)
      ? selectGovVaultUserStackedBalanceInDepositToken(state, vault.id)
      : selectStandardVaultUserBalanceInDepositTokenIncludingBoosts(state, vault.id);
    return deposit.isGreaterThan(0);
  });
  const displayBoostWidget = useAppSelector(state =>
    selectShouldDisplayBoostWidget(state, vaultId)
  );

  const handlePriceImpactConfirm = useCallback<ZapPriceImpactProps['onChange']>(
    shouldDisable => {
      setPriceImpactDisableWithdraw(shouldDisable);
    },
    [setPriceImpactDisableWithdraw]
  );

  const handleWithdraw = () => {
    const steps: Step[] = [];
    if (!isWalletConnected) {
      return dispatch(askForWalletConnection());
    }
    if (!isWalletOnVaultChain) {
      return dispatch(askForNetworkChange({ chainId: vault.chainId }));
    }

    if (isGovVault(vault)) {
      steps.push({
        step: 'withdraw',
        message: t('Vault-TxnConfirm', { type: t('Withdraw-noun') }),
        action: walletActions.unstakeGovVault(vault, formState.amount),
        pending: false,
      });
    } else {
      if (formState.isZap) {
        if (needsApproval && formState.zapEstimate) {
          steps.push({
            step: 'approve',
            message: t('Vault-ApproveMsg'),
            action: walletActions.approval(earnedToken, spenderAddress),
            pending: false,
          });
        }

        steps.push({
          step: 'withdraw',
          message: t('Vault-TxnConfirm', { type: t('Withdraw-noun') }),
          action: formState.isZapSwap
            ? walletActions.beefOutAndSwap(
                vault,
                formState.amount,
                formState.zapOptions,
                formState.zapEstimate,
                formState.slippageTolerance
              )
            : walletActions.beefOut(vault, formState.amount, formState.zapOptions),
          pending: false,
        });
      } else {
        steps.push({
          step: 'withdraw',
          message: t('Vault-TxnConfirm', { type: t('Withdraw-noun') }),
          action: walletActions.withdraw(vault, formState.amount, formState.max),
          pending: false,
        });
      }
    }

    startStepper(steps);
  };

  const handleClaimBounty = () => {
    const steps: Step[] = [];
    if (!isWalletConnected) {
      return dispatch(askForWalletConnection());
    }
    if (!isWalletOnVaultChain) {
      return dispatch(askForNetworkChange({ chainId: vault.chainId }));
    }

    steps.push({
      step: 'harvest',
      message: t('Vault-TxnConfirm', { type: t('Harvest-noun') }),
      action: walletActions.harvest(vault),
      pending: false,
    });

    startStepper(steps);
  };

  const handleClaim = () => {
    const steps: Step[] = [];
    if (!isWalletConnected) {
      return dispatch(askForWalletConnection());
    }
    if (!isWalletOnVaultChain) {
      return dispatch(askForNetworkChange({ chainId: vault.chainId }));
    }
    if (!isGovVault(vault)) {
      return;
    }

    steps.push({
      step: 'claim-gov',
      message: t('Vault-TxnConfirm', { type: t('Claim-noun') }),
      action: walletActions.claimGovVault(vault),
      pending: false,
    });

    startStepper(steps);
  };

  const handleExit = () => {
    const steps: Step[] = [];
    if (!isWalletConnected) {
      return dispatch(askForWalletConnection());
    }
    if (!isWalletOnVaultChain) {
      return dispatch(askForNetworkChange({ chainId: vault.chainId }));
    }
    if (!isGovVault(vault)) {
      return;
    }

    steps.push({
      step: 'claim-withdraw',
      message: t('Vault-TxnConfirm', { type: t('Claim-Withdraw-noun') }),
      action: walletActions.exitGovVault(vault),
      pending: false,
    });

    startStepper(steps);
  };

  const handleAsset = (selectedToken: TokenEntity['id'] | TokenEntity['id'][]) => {
    dispatch(withdrawActions.setAsset({ selectedToken, state: store.getState() }));
  };

  const handleInput = (amountStr: string) => {
    dispatch(withdrawActions.setInput({ amount: amountStr, state: store.getState() }));
  };

  const handleMax = () => {
    dispatch(withdrawActions.setMax({ state: store.getState() }));
  };

  const isBoosted = useAppSelector(state => selectIsVaultPreStakedOrBoosted(state, vaultId));

  const activeBoost = useAppSelector(state =>
    isBoosted ? selectBoostById(state, selectPreStakeOrActiveBoostIds(state, vaultId)[0]) : null
  );

  const pastBoostsWithUserBalance = useAppSelector(state =>
    selectPastBoostIdsWithUserBalance(state, vaultId).map(boostId => {
      return boostId;
    })
  );

  const isBoostedOrHaveBalanceInPastBoost = isBoosted || pastBoostsWithUserBalance.length === 1;

  const boost = useAppSelector(state =>
    isBoosted
      ? selectBoostById(state, activeBoost.id)
      : pastBoostsWithUserBalance.length === 1
      ? selectBoostById(state, pastBoostsWithUserBalance[0])
      : null
  );

  const boostBalance = useAppSelector(state =>
    isBoostedOrHaveBalanceInPastBoost
      ? selectBoostUserBalanceInToken(state, boost.id)
      : new BigNumber(BIG_ZERO)
  );

  const mooBalance = useAppSelector(state =>
    selectUserBalanceOfToken(state, vault.chainId, earnedToken.address)
  );

  const showDepositedText =
    isBoostedOrHaveBalanceInPastBoost &&
    formState.zapOptions !== null &&
    boostBalance.isGreaterThan(0)
      ? false
      : true;

  useAppSelector(state => (beefyState = state));

  const native = useAppSelector(state => selectChainNativeToken(state, vault.chainId));
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
    <>
      <Box p={3}>
        <Box display="flex">
          <div
            className={clsx(
              isBoostedOrHaveBalanceInPastBoost &&
                boostBalance.isGreaterThan(0) &&
                formState.zapOptions === null
                ? classes.width50
                : classes.width100
            )}
          >
            {showDepositedText && <div className={classes.balanceText}>{t('Pending-Verb')}</div>}

            <RadioGroup
              className={classes.radioGroup}
              value={native}
              aria-label="deposit-asset"
              name="deposit-asset"
            >
              <FormControlLabel
                className={classes.depositTokenContainer}
                value={native.id}
                control={formState.zapOptions !== null ? <Radio /> : <div style={{ width: 12 }} />}
                label={formatBigUsd(
                  pendingCompound
                    .multipliedBy(denominatorFee)
                    .dividedBy(callFee)
                    .multipliedBy(denominatorFee)
                    .div(vaultFee)
                    .multipliedBy(nativeUsd)
                )}
                disabled={!formReady}
              />
            </RadioGroup>

            {showDepositedText && <div className={classes.balanceText2}>{t('Compound-Verb')}</div>}

            <RadioGroup
              className={classes.radioGroup}
              value={native}
              aria-label="pending-asset"
              name="pending-asset"
            >
              <FormControlLabel
                className={classes.depositTokenContainer}
                value={native.id}
                control={formState.zapOptions !== null ? <Radio /> : <div style={{ width: 12 }} />}
                label={
                  <BountyWithBalance
                    token={native}
                    vaultId={vaultId}
                    balance={pendingCompound}
                    decimals={12}
                    usdValue={pendingCompound.multipliedBy(nativeUsd)}
                  />
                }
                disabled={!formReady}
              />
            </RadioGroup>
          </div>
        </Box>
        <Box mt={3}>
          {vault.chainId === 'emerald' ? <EmeraldGasNotice /> : null}
          {isWalletConnected ? (
            !isWalletOnVaultChain ? (
              <>
                <Button
                  onClick={() => dispatch(askForNetworkChange({ chainId: vault.chainId }))}
                  className={classes.btnSubmit}
                  fullWidth={true}
                >
                  {t('Network-Change', { network: chain.name.toUpperCase() })}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleClaimBounty} className={classes.btnSubmit} fullWidth={true}>
                  {t('Claim-Bounty')}
                </Button>
              </>
            )
          ) : (
            <Button
              className={classes.btnSubmit}
              fullWidth={true}
              onClick={() => dispatch(askForWalletConnection())}
            >
              {t('Network-ConnectWallet')}
            </Button>
          )}
        </Box>
      </Box>

      {displayBoostWidget && <BoostWidget vaultId={vaultId} />}
      <Stepper />
    </>
  );
};
