import {
  makeStyles,
} from '@material-ui/core';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { selectFilterPlatformId } from '../../../../../data/selectors/filtered-vaults';
import { ToggleButtonsProps } from '../../../../../../components/ToggleButtons';
import { filteredVaultsActions } from '../../../../../data/reducers/filtered-vaults';
import { LabeledSelect } from '../../../../../../components/LabeledSelect';
import { selectFilterPlatforms } from '../../../../../data/selectors/platforms';

import { styles } from '../../../../../vault/components/styles';
import { selectVaultById } from '../../../../../../features/data/selectors/vaults';
import { VaultEntity } from '../../../../../../features/data/entities/vault';
import { selectTokenByAddress } from '../../../../../../features/data/selectors/tokens';

const useStyles = makeStyles(styles);

export type TokenDropdownFilterProps = {
  vaultId: VaultEntity['id'];
};
export const TokenDropdownFilter = memo<TokenDropdownFilterProps>(function ({ vaultId }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const allKey = null;
  const placeholderAutoKey = '_auto';
  const platforms = useAppSelector(selectFilterPlatforms);

  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const autocomp = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );

  const options: Record<string, string> = useMemo(
    () =>
      Object.fromEntries([
        [placeholderAutoKey, autocomp.symbol],
        //...autocomp.map(platform => [platform.id, platform.name]),
      ]),
    [autocomp, t]
  );
  const value = useAppSelector(selectFilterPlatformId);
  const handleChange = useCallback<ToggleButtonsProps['onChange']>(
    value => {
      //dispatch(filteredVaultsActions.setPlatformId(value === placeholderAllKey ? allKey : value));
    },
    [dispatch, placeholderAutoKey, allKey]
  );

  return (
    <LabeledSelect
      label={t('Filter-Platform')}
      //dropdownItemSelectedClass={classes.inputContainer}
      value={value === allKey ? placeholderAutoKey : value}
      options={options}
      onChange={handleChange}
      selectClass={vaultId}
      fullWidth={false}
      sortOptions="label"
      defaultValue={placeholderAutoKey}
    />
  );
});
