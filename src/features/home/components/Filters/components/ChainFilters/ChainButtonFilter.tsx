import React, { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { selectFilterChainIds } from '../../../../../data/selectors/filtered-vaults';
import { ChainEntity } from '../../../../../data/entities/chain';
import { filteredVaultsActions } from '../../../../../data/reducers/filtered-vaults';
import { ChainButtonSelector } from './ChainButtonSelector';
import { ChainButtonAnimated } from './ChainButtonAnimated';

export type ChainButtonFilterProps = {
  className?: string;
};
export const ChainButtonFilter = memo<ChainButtonFilterProps>(function ChainButtonFilter({
  className,
}) {
  const dispatch = useAppDispatch();
  const selectedChainIds = useAppSelector(selectFilterChainIds);

  const handleChainSelectorChange = useCallback(
    (selected: ChainEntity['id'][]) => {
      dispatch(filteredVaultsActions.setChainIds(selected));
    },
    [dispatch]
  );

  return (
    <ChainButtonAnimated
      selected={selectedChainIds}
      onChange={handleChainSelectorChange}
      className={className}
    />
  );
});
