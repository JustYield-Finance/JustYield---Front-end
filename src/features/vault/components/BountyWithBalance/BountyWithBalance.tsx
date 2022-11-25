import { Box, makeStyles } from '@material-ui/core';
import { styles } from './styles';
import { AssetsImage } from '../../../../components/AssetsImage';
import { formatBigDecimals } from '../../../../helpers/format';
import { TokenEntity } from '../../../data/entities/token';
import { VaultEntity } from '../../../data/entities/vault';
import { selectUserBalanceOfToken } from '../../../data/selectors/balance';
import { selectVaultById } from '../../../data/selectors/vaults';
import { selectTokenByAddress } from '../../../data/selectors/tokens';
import { useAppSelector } from '../../../../store';
import { BigNumber } from 'bignumber.js';

const useStyles = makeStyles(styles);

export function BountyWithBalance({
  token,
  vaultId,
  balance,
  variant = 'lg',
}: {
  token: TokenEntity;
  vaultId: VaultEntity['id'];
  balance: BigNumber;
  variant?: 'sm' | 'lg';
}) {
  const classes = useStyles();
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const depositToken = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );

  return (
    <Box className={classes.balanceContainer}>
      <Box>
        <div className={classes.assetCount}>
          {formatBigDecimals(balance, 6)}
        </div>
      </Box>
      <Box flexGrow={1} pl={1}>
        <AssetsImage
          chainId={vault.chainId}
          assetIds={token.address === depositToken.address ? vault.assetIds : [token.id]}
          size={variant === 'sm' ? 20 : 24}
        />
      </Box>
    </Box>
  );
}
