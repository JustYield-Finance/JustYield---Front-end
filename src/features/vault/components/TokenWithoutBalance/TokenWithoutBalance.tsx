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

const useStyles = makeStyles(styles);

export function TokenWithoutBalance({
  token,
  vaultId,
  variant = 'lg',
}: {
  token: TokenEntity;
  vaultId: VaultEntity['id'];
  variant?: 'sm' | 'lg';
}) {
  const classes = useStyles();
  const vault = useAppSelector(state => selectVaultById(state, vaultId));
  const depositToken = useAppSelector(state =>
    selectTokenByAddress(state, vault.chainId, vault.depositTokenAddress)
  );
  const balance = useAppSelector(state =>
    selectUserBalanceOfToken(state, vault.chainId, token.address)
  );

  return (
    <Box className={classes.balanceContainer}>
      <Box>
        <AssetsImage
          chainId={vault.chainId}
          assetIds={token.address === depositToken.address ? vault.assetIds : [token.id]}
          //assetIds={token.address === depositToken.address ? ["BTC"] : [token.id]}
          size={variant === 'sm' ? 35 : 42}
        />
      </Box>
      <Box flexGrow={1} pl={1}>
        <div className={classes.assetCount}>
          {
            token.symbol
          }
        </div>
      </Box>
    </Box>
  );
}
