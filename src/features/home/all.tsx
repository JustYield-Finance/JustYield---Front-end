import React, { memo } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { Filters } from './components/Filters';
import { Portfolio } from './components/Portfolio';
import { Loading } from './components/Loading';
import { selectIsVaultListAvailable } from '../data/selectors/data-loader';
import { styles } from './styles';
import { Vaults } from './components/Vaults';
import { useAppSelector } from '../../store';
// import { ProposalBanner } from '../../components/ProposalBanner';
import { BeefyState } from '../../redux-types';
import { selectFilteredVaults } from '../data/selectors/filtered-vaults';
const useStyles = makeStyles(styles);

export const All = memo(function Home() {
  const classes = useStyles();
  const isVaultListAvailable = useAppSelector(selectIsVaultListAvailable);
  const vaultIds = useAppSelector(selectFilteredVaults);

  if (!isVaultListAvailable) {
    return <Loading />;
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.vaultContainer}>
        <Portfolio />
        <Vaults />
      </Container>
    </>
  );
});
