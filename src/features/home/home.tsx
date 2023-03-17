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

import './stylesHome.css';
import { Link, NavLink } from 'react-router-dom';

import btcIcon from '../../images/single-assets/BTC.svg';
import usdIcon from '../../images/single-assets/USDT.svg';
import ethIcon from '../../images/single-assets/ETH.svg';
import back from '../../images/bifi-logos/yieldlogo.png';
import { selectVaultById } from '../data/selectors/vaults';
import { selectVaultTotalApy } from '../data/selectors/apy';
import { formattedTotalApy } from '../../helpers/format';

const useStyles = makeStyles(styles);

export const Home = memo(function Home() {
  const isVaultListAvailable = useAppSelector(selectIsVaultListAvailable);

  var bestBTC = 0;
  var bestUSD = 0;
  var bestETH = 0;

  var linkBTC = '';
  var linkUSD = '';
  var linkETH = '';

  useAppSelector(state => {
    const allIds = state.entities.vaults.allIds;

    allIds.forEach(vaultId => {
      var vault = selectVaultById(state, vaultId);
      if (linkBTC == '' && vault.name == 'BTC' && vault.status == 'active') {
        linkBTC = vault.id;
      }
      if (linkUSD == '' && vault.name == 'USDT' && vault.status == 'active') {
        linkUSD = vault.id;
      }
      if (linkETH == '' && vault.name == 'ETH' && vault.status == 'active') {
        linkETH = vault.id;
      }

      if (linkBTC != '' && linkUSD != '' && linkETH != '') {
        return;
      }
    });

    allIds.forEach(vaultId => {
      var vault = selectVaultById(state, vaultId);
      if (vault.name == 'BTC' && vault.status == 'active') {
        var apy = selectVaultTotalApy(state, vault.id);
        if (apy.totalApy * 100 >= bestBTC) {
          const formatted = formattedTotalApy(apy, '???');
          bestBTC = parseFloat(formatted.totalApy.replace('%', ''));
          linkBTC = vault.id;
        }
      }
      if (vault.name == 'USDT' && vault.status == 'active') {
        var apy = selectVaultTotalApy(state, vault.id);
        if (apy.totalApy * 100 >= bestUSD) {
          const formatted = formattedTotalApy(apy, '???');
          bestUSD = parseFloat(formatted.totalApy.replace('%', ''));
          linkUSD = vault.id;
        }
      }
      if (vault.name == 'ETH' && vault.status == 'active') {
        var apy = selectVaultTotalApy(state, vault.id);
        if (apy.totalApy * 100 >= bestETH) {
          const formatted = formattedTotalApy(apy, '???');
          bestETH = parseFloat(formatted.totalApy.replace('%', ''));
          linkETH = vault.id;
        }
      }
    });
  });

  bestBTC = bestBTC == 0 ? 3.5 : bestBTC;
  bestUSD = bestUSD == 0 ? 12 : bestUSD;
  bestETH = bestETH == 0 ? 8.2 : bestETH;

  if (!isVaultListAvailable) {
    return <Loading />;
  }

  return (
    <NavLink
      className="gradientBackground"
      exact={true}
      key={'/all'}
      to={'/all'}
      target={undefined}
    >
      <div className="backgroundImg" />
      <div className="gradientBackground">
        <div className="containerJY">
          <h1 className="top" data-shadow="Just">
            Just
          </h1>
          <h1 className="bottom" data-shadow="Yield">
            Yield
          </h1>
        </div>
        <div id="bubbles">
          <div id="SpeechBubblebtcMobile">Struggling to take profits ?</div>
          <div id="SpeechBubblematicMobile">Auto-compound Vaults</div>
          <div id="SpeechBubbleavaxMobile">DCA on yield</div>
          <div id="SpeechBubbleethMobile">Bounty Hunts</div>
        </div>
        <div id="TEST">
          <div className="animation-example">
            <div className="item">
              <div className="line"></div>
              <div className="dot"></div>
              <div className="circle1">
                <div id="SpeechBubblebtc">Struggling to take profits ?</div>
              </div>
            </div>
            <div className="item">
              <div className="line"></div>
              <div className="dot"></div>
              <div className="circle2">
                <div id="SpeechBubbleavax">DCA on yield</div>
              </div>
            </div>
            <div className="item">
              <div className="line"></div>
              <div className="dot"></div>
              <div className="circle3"></div>
            </div>
            <div className="item">
              <div className="line"></div>
              <div className="dot"></div>
              <div className="circle4"></div>
            </div>
            <div className="item -type2">
              <div className="line"></div>
              <div className="dot"></div>
              <div className="circle5"></div>
            </div>
            <div className="item -type2">
              <div className="line"></div>
              <div className="dot"></div>
              <div className="circle6"></div>
            </div>
            <div className="item -type2">
              <div className="line"></div>
              <div className="dot"></div>
              <div className="circle7">
                <div id="SpeechBubblematic">Auto-compound Vaults</div>
              </div>
            </div>
            <div className="item -type2">
              <div className="line"></div>
              <div className="dot"></div>
              <div className="circle8">
                <div id="SpeechBubbleeth">Bounty Hunts</div>
              </div>
            </div>
            <div className="center">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle">
                <div className="linkcircle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
});
