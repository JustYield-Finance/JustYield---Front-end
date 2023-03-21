import React, { memo, Suspense, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppBar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  useMediaQuery,
} from '@material-ui/core';
import { Close, Menu } from '@material-ui/icons';
import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import {
  selectCurrentChainId,
  selectIsWalletConnected,
} from '../../features/data/selectors/wallet';
import { formatBigUsd } from '../../helpers/format';
import { BeefyState } from '../../redux-types';
import { LanguageDropdown } from '../LanguageDropdown';
import { ChainEntity } from '../../features/data/entities/chain';
import { NetworkStatus } from '../NetworkStatus';
import { styles } from './styles';
import './stylesHeader.css';
import { BIG_ZERO } from '../../helpers/big-number';

import shield from './imgs/shield.svg';
import coin from './imgs/coin.svg';
import blockchain from './imgs/blockchain.svg';

import basics from './imgs/basics.svg';
import advanced from './imgs/advanced.svg';
import discord from './imgs/discord.svg';
import github from './imgs/github.svg';
import telegram from './imgs/telegram.svg';
import twitter from './imgs/twitter.svg';

import treasury from './imgs/treasury.svg';
import proposal from './imgs/proposal.svg';

// lazy load web3 related stuff, as libs are quite heavy
const WalletContainer = React.lazy(() => import(`./components/WalletContainer`));

const useStyles = makeStyles(styles);

const BifiPrice = connect((state: BeefyState) => {
  const beefyPrice = state.entities.tokens.prices.byOracleId['BIFI'] || BIG_ZERO;
  return { beefyPrice };
})(({ beefyPrice }: { beefyPrice: BigNumber }) => {
  const classes = useStyles();
  return (
    <div></div>
    /*<a
      className={classes.bifiPrice}
      href="https://app.1inch.io/#/56/swap/BNB/BIFI"
      target="_blank"
      rel="noreferrer"
    >
      <img alt="BIFI" src={require(`../../images/bifi-logos/BIFI-TOKEN.svg`).default} />
      {
        "$YIELD"
        //formatBigUsd(beefyPrice)
      }
    </a>*/
  );
});

const NavLinks = memo(function () {
  const { t } = useTranslation();
  const classes = useStyles();
  const navLinks = [
    { title: t('Earn'), url: '/all' },
    //{ title: t('Multi-Strategies Vaults'), url: '/multi' },
    //{ title: t('Single-Exposure Vaults'), url: '/single' },
    { title: t('Documentation'), url: 'https://docs.justyield.finance' },
    { title: t('Treasury'), url: '/treasury' },
    { title: t('Propose, Vote, Delegate'), url: '/vote' },
  ];
  return (
    <>
      {navLinks.map(({ title, url }) =>
        url[0] === '/' ? (
          <NavLink
            activeClassName={classes.active}
            exact={true}
            className={classes.navLink}
            key={url}
            to={url[0] === '/' ? url : { pathname: url }}
            target={url[0] === '/' ? undefined : '_blank'}
          >
            {title == 'New' ? (
              <Badge badgeContent="New" color="primary">
                {t(title)}
              </Badge>
            ) : (
              t(title)
            )}
          </NavLink>
        ) : (
          <a
            className={classes.navLink}
            href={'https://docs.justyield.finance'}
            target={'_blank'}
            rel={'noopener'}
          >
            {title == 'New' ? (
              <Badge badgeContent="New" color="primary">
                {t(title)}
              </Badge>
            ) : (
              t(title)
            )}
          </a>
        )
      )}
    </>
  );
});

const NavLinksFull = memo(function () {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <nav id="menu">
        {/*Products Menu*/}
        <div className="menu-item">
          <div className="menu-text">
            <NavLink
              activeClassName={classes.active}
              exact={true}
              className={classes.newNavLink}
              key={'/all'}
              to={'/all'}
              target={undefined}
            >
              <button className="btn text-white" style={{ background: '#85bf4b' }}>
                <b>Earn</b>
              </button>
            </NavLink>
          </div>
          {/*<div className="sub-menu">
            <div className="icon-box">
              <div className="icon">
                <img src={coin} className="menuIcon" />
              </div>
              <div className="text">
                <NavLink
                  activeClassName={classes.active}
                  exact={true}
                  className={classes.newNavLink}
                  key={'/'}
                  to={'/'}
                  target={undefined}
                >
                  <div className="title">
                    Optimized Vaults <i className="far fa-arrow-right"></i>
                  </div>
                  <div className="sub-text">Best APYs, Diversified Risk</div>
                </NavLink>
              </div>
            </div>
            <div className="icon-box">
              <div className="icon">
                <img src={blockchain} className="menuIcon" />
              </div>
              <div className="text">
                <NavLink
                  activeClassName={classes.active}
                  exact={true}
                  className={classes.newNavLink}
                  key={'/multi'}
                  to={'/multi'}
                  target={undefined}
                >
                  <div className="title">
                    Multi-Strategies Vaults <i className="far fa-arrow-right"></i>
                  </div>
                  <div className="sub-text">High APYs, Multiple Protocols</div>
                </NavLink>
              </div>
            </div>
            <div className="icon-box">
              <div className="icon">
                <img src={shield} className="menuIcon" />
              </div>
              <div className="text">
                <NavLink
                  activeClassName={classes.active}
                  exact={true}
                  className={classes.newNavLink}
                  key={'/single'}
                  to={'/single'}
                  target={undefined}
                >
                  <div className="title">
                    Single-Exposure Vaults <i className="far fa-arrow-right"></i>
                  </div>
                  <div className="sub-text">100% User-controlled exposure</div>
                </NavLink>
              </div>
            </div>
            <div className="sub-menu-holder"></div>
          </div>*/}
        </div>
        {/*Just Yield Menu*/}
        <div className="menu-item align-self-center">
          <div className="menu-text">
            <a>Ecosystem</a>
          </div>
          <div className="sub-menu triple">
            <div className="top-container gb c icon-box">
              <div className="icon big">
                <i className="far fa-book"></i>
              </div>
              <div className="text">
                <a
                  className={classes.newNavLink}
                  href={'https://docs.justyield.finance'}
                  target={'_blank'}
                  rel={'noopener'}
                >
                  <div className="title">
                    Documentation <i className="far fa-arrow-right"></i>
                  </div>
                  <div className="sub-text">Always remember to DYOR</div>
                </a>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <img src={basics} className="menuIcon" />
              </div>
              <div className="text">
                <div className="title">BASICS</div>
              </div>
              <a
                className={classes.newNavLink}
                href={'https://docs.justyield.finance/get-started'}
                target={'_blank'}
                rel={'noopener'}
              >
                Get Started
              </a>
              <a
                className={classes.newNavLink}
                href={'https://docs.justyield.finance/just-yield/basics'}
                target={'_blank'}
                rel={'noopener'}
              >
                Basics
              </a>
              <a
                className={classes.newNavLink}
                href={'https://docs.justyield.finance/faq/how-to'}
                target={'_blank'}
                rel={'noopener'}
              >
                How To
              </a>
              <a
                className={classes.newNavLink}
                href={'https://docs.justyield.finance/governance/team-and-goals'}
                target={'_blank'}
                rel={'noopener'}
              >
                Team
              </a>
            </div>
            <div className="box">
              <div className="icon">
                <img src={advanced} className="menuIcon" />
              </div>
              <div className="text">
                <div className="title">ADVANCED</div>
              </div>
              <a
                className={classes.newNavLink}
                href={'https://docs.justyield.finance/just-yield/optimized-vaults'}
                target={'_blank'}
                rel={'noopener'}
              >
                Optimized Vaults
              </a>
              <a
                className={classes.newNavLink}
                href={'https://docs.justyield.finance/just-yield/multi-strategies-vaults'}
                target={'_blank'}
                rel={'noopener'}
              >
                Multi-Strategies Vaults
              </a>
              <a
                className={classes.newNavLink}
                href={'https://docs.justyield.finance/just-yield/single-exposure-vaults'}
                target={'_blank'}
                rel={'noopener'}
              >
                Single-Exposure Vaults
              </a>
              <a
                className={classes.newNavLink}
                href={'https://docs.justyield.finance/just-yield/flexible-rewards'}
                target={'_blank'}
                rel={'noopener'}
              >
                Flexible Rewards
              </a>
            </div>
            <div className="icon-box flat">
              <a
                className={classes.newNavLink}
                href={'https://twitter.com/JustYield_Fi'}
                target={'_blank'}
                rel={'noopener'}
              >
                <div className="icon">
                  <img src={twitter} className="menuIcon" />
                </div>
                <div className="text">
                  <div className="title ">Twitter</div>
                </div>
              </a>
            </div>
            <div className="icon-box flat">
              <a
                className={classes.newNavLink}
                href={'https://t.me/JustYield'}
                target={'_blank'}
                rel={'noopener'}
              >
                <div className="icon">
                  <img src={telegram} className="menuIcon" />
                </div>
                <div className="text">
                  <div className="title">Telegram</div>
                </div>
              </a>
            </div>
            <div className="icon-box flat">
              <a
                className={classes.newNavLink}
                href={'https://discord.gg/bbdvQJ4Avg'}
                target={'_blank'}
                rel={'noopener'}
              >
                <div className="icon">
                  <img src={discord} className="menuIcon" />
                </div>
                <div className="text">
                  <div className="title">Discord</div>
                </div>
              </a>
            </div>
            <div className="icon-box flat">
              <a
                className={classes.newNavLink}
                href={'https://github.com/JustYield-Finance'}
                target={'_blank'}
                rel={'noopener'}
              >
                <div className="icon">
                  <img src={github} className="menuIcon" />
                </div>
                <div className="text">
                  <div className="title">GitHub</div>
                </div>
              </a>
            </div>
            <div className="sub-menu-holder"></div>
          </div>
        </div>
        {/*Governance Menu*/}
        <div className="menu-item">
          <div className="menu-text align-self-center">
            <a className="disabled">
              Governance
              <span className="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-info">
                Soon
                <span className="visually-hidden"></span>
              </span>
            </a>
          </div>
          {/*<div className="sub-menu">
            <div className="icon-box">
              <div className="icon">
                <img src={treasury} className="menuIcon" />
              </div>
              <div className="text">
                <NavLink
                  activeClassName={classes.active}
                  exact={true}
                  className={classes.newNavLink}
                  key={'/treasury'}
                  to={'/treasury'}
                  target={undefined}
                >
                  <div className="title">
                    Treasury <i className="far fa-arrow-right"></i>
                  </div>
                  <div className="sub-text">Protocol Holdings</div>
                </NavLink>
              </div>
            </div>
            <div className="icon-box">
              <div className="icon">
                <img src={proposal} className="menuIcon" />
              </div>
              <div className="text">
                <NavLink
                  activeClassName={classes.active}
                  exact={true}
                  className={classes.newNavLink}
                  key={'/vote'}
                  to={'/vote'}
                  target={undefined}
                >
                  <div className="title">
                    Proposals <i className="far fa-arrow-right"></i>
                  </div>
                  <div className="sub-text">Propose, Vote, Delegate</div>
                </NavLink>
              </div>
            </div>
            <div className="sub-menu-holder"></div>
          </div>*/}
        </div>
      </nav>
    </>
  );
});

const ActiveChain = ({ networkId }: { networkId: string | null }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.chain} style={{ textDecoration: 'none' }}>
      {networkId === null ? null : (
        <img alt={networkId} src={require(`../../images/networks/${networkId}.svg`).default} />
      )}{' '}
      {networkId === null ? t('Network-Unsupported') : networkId.toLocaleUpperCase()}
    </div>
  );
};

export const Header = connect((state: BeefyState) => {
  const currentChainId = selectCurrentChainId(state);
  const isWalletConnected = selectIsWalletConnected(state);
  return { isWalletConnected, currentChainId };
})(
  ({
    isWalletConnected,
    currentChainId,
  }: {
    isWalletConnected: boolean;
    currentChainId: ChainEntity['id'] | null;
  }) => {
    const classes = useStyles();

    const isMobile = useMediaQuery('(max-width: 600px)');

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    return (
      <Box style={{ background: '#E8E8E9' }}>
        <AppBar className={clsx([classes.navHeader, classes.hasPortfolio])} position="static">
          <Container className={classes.container} maxWidth="lg">
            <Toolbar disableGutters={true}>
              <Box sx={{ flexGrow: 1 }}>
                {isMobile ? (
                  <Link className={classes.beefy} to="/">
                    <img
                      alt="JustYield"
                      src={
                        isMobile
                          ? require(`../../images/bifi-logos/header-logo-notext.png`).default
                          : require(`../../images/bifi-logos/header-logo.png`).default
                      }
                      height="50px"
                    />
                  </Link>
                ) : (
                  <Link className={classes.beefy} to="/">
                    <img
                      alt="JustYield"
                      src={
                        isMobile
                          ? require(`../../images/bifi-logos/header-logo-notext.png`).default
                          : require(`../../images/bifi-logos/header-logo.png`).default
                      }
                      height="75px"
                    />
                  </Link>
                )}
              </Box>
              <Hidden mdDown>
                <Box className={classes.flex} sx={{ flexGrow: 1 }}>
                  <NavLinksFull />
                </Box>
              </Hidden>
              <Box className={classes.flex}>
                <Hidden mdDown>
                  <BifiPrice />
                  {/*<Box>
                    <LanguageDropdown />
                  </Box>*/}
                  {isWalletConnected && (
                    <Box mr={3}>
                      <ActiveChain networkId={currentChainId} />
                    </Box>
                  )}
                </Hidden>
                <NetworkStatus />
                <div className={classes.walletContainer}>
                  <Suspense fallback={<>...</>}>
                    <WalletContainer />
                  </Suspense>
                </div>
              </Box>
              <Hidden lgUp>
                <button
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  className={classes.toggleDrawer}
                >
                  <Menu fontSize="inherit" className={classes.toggleDrawerIcon} />
                </button>
                <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                  <Box className={classes.drawerBlack}>
                    <Box
                      display="flex"
                      alignContent="center"
                      justifyContent="flex-end"
                      mx={2}
                      my={1}
                    >
                      <IconButton onClick={handleDrawerToggle}>
                        <Close />
                      </IconButton>
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    className={classes.mobileMenu}
                    role="presentation"
                    onClick={handleDrawerToggle}
                    onKeyDown={handleDrawerToggle}
                    flexGrow={1}
                  >
                    <Box mt={2} className={classes.navMobile}>
                      <NavLinks />
                    </Box>
                  </Box>
                  <Divider />
                  <Box className={classes.drawerBlack}>
                    <Box mx={2} my={2}>
                      <BifiPrice />
                    </Box>
                    <Box mx={2} my={1} display="flex">
                      {isWalletConnected && <ActiveChain networkId={currentChainId} />}
                      <LanguageDropdown />
                    </Box>
                  </Box>
                </Drawer>
              </Hidden>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    );
  }
);
