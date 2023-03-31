import React, { memo } from 'react';
import { Link } from 'react-router-dom';
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

import front from '../../images/bifi-logos/front.png';
import arbitrum from '../../images/networks/arbitrum-1.svg';
import choose from '../../images/bifi-logos/choose.png';
import deposit from '../../images/bifi-logos/deposit.png';
import compound from '../../images/bifi-logos/compound.png';

import './stylesLandpage.css';

const useStyles = makeStyles(styles);

export const Landpage = memo(function Home() {
  const classes = useStyles();
  const isVaultListAvailable = useAppSelector(selectIsVaultListAvailable);
  const vaultIds = useAppSelector(selectFilteredVaults);

  if (!isVaultListAvailable) {
    return <Loading />;
  }

  return (
    <>
      {
        // Hero
      }
      <div className="px-4 pt-5 mt-5 text-center border-bottom">
        <h1 className="display-4 fw-bold">
          Introducing
          <br />
          <span style={{ color: '#85bf4b' }}>Flexible Rewards</span>
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Stake your valuable assets, Choose your rewards, Catch best APY's
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Link to="/all">
              <button
                type="button"
                className="btn btn-lg px-4 me-sm-3 text-white"
                style={{ backgroundColor: '#85bf4b' }}
              >
                Stake Now
              </button>
            </Link>
            <a
              className="btn btn-outline-secondary btn-lg px-4"
              href={'https://docs.justyield.finance'}
              target={'_blank'}
              rel={'noopener'}
            >
              Documentation
            </a>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
          <div className="container px-5">
            <img
              src={front}
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width="1000"
              height="auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      {
        // Roadmap
      }
      <div className="px-4 pt-2 mt-5 text-center">
        <h1 className="display-6">Our Story</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Past, Present, and{' '}
            <span className="fw-bold" style={{ color: '#85bf4b' }}>
              Future
            </span>
          </p>
        </div>
      </div>
      <div className="col-lg-8 mx-auto mb-5">
        <div className="apland-timeline-area">
          <div className="single-timeline-area">
            <div
              className="timeline-date wow fade-in-left"
              data-wow-delay="0.1s"
              style={{ visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeInLeft' }}
            >
              <p>Q1 2023</p>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  className="single-timeline-content d-flex wow fadeInLeft"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: 'visible',
                    animationDelay: '0.3s',
                    animationName: 'fadeInLeft',
                  }}
                >
                  <div className="timeline-icon">
                    <i className="fa fa-rocket-launch" aria-hidden="true"></i>
                  </div>
                  <div className="timeline-text">
                    <h6>Official Launch</h6>
                    <p>08/02/2023</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  className="single-timeline-content d-flex wow fadeInLeft"
                  data-wow-delay="0.5s"
                  style={{
                    visibility: 'visible',
                    animationDelay: '0.5s',
                    animationName: 'fadeInLeft',
                  }}
                >
                  <div className="timeline-icon">
                    <img width="20px" height="20px" src={arbitrum} aria-hidden="true" />
                  </div>
                  <div className="timeline-text">
                    <h6>Arbitrum Launch</h6>
                    <p>Just Yield on Arbitrum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-timeline-area">
            <div
              className="timeline-date wow fadeInLeft"
              data-wow-delay="0.1s"
              style={{ visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeInLeft' }}
            >
              <p>Q2 2023</p>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  className="single-timeline-content d-flex wow fadeInLeft"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: 'visible',
                    animationDelay: '0.3s',
                    animationName: 'fadeInLeft',
                  }}
                >
                  <div className="timeline-icon">
                    <i className="fa fa-bitcoin" aria-hidden="true"></i>
                  </div>
                  <div className="timeline-text">
                    <h6>Flexible Rewards</h6>
                    <p>Introducing Flexible Rewards Vaults</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  className="single-timeline-content d-flex wow fadeInLeft"
                  data-wow-delay="0.5s"
                  style={{
                    visibility: 'visible',
                    animationDelay: '0.5s',
                    animationName: 'fadeInLeft',
                  }}
                >
                  <div className="timeline-icon">
                    <i className="fa fa-chart-network" aria-hidden="true"></i>
                  </div>
                  <div className="timeline-text">
                    <h6>New Blockchains</h6>
                    <p>Just Yield expand to new blockchains</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-timeline-area">
            <div
              className="timeline-date wow fadeInLeft"
              data-wow-delay="0.1s"
              style={{ visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeInLeft' }}
            >
              <p>Q3 2023</p>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  className="single-timeline-content d-flex wow fadeInLeft"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: 'visible',
                    animationDelay: '0.3s',
                    animationName: 'fadeInLeft',
                  }}
                >
                  <div className="timeline-icon">
                    <i className="fa fa-chess-queen" aria-hidden="true"></i>
                  </div>
                  <div className="timeline-text">
                    <h6>Multi-Strategies</h6>
                    <p>Yield-Aggregator 2.0</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  className="single-timeline-content d-flex wow fadeInLeft"
                  data-wow-delay="0.5s"
                  style={{
                    visibility: 'visible',
                    animationDelay: '0.5s',
                    animationName: 'fadeInLeft',
                  }}
                >
                  <div className="timeline-icon">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </div>
                  <div className="timeline-text">
                    <h6>Governance</h6>
                    <p>Empowering users</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  className="single-timeline-content d-flex wow fadeInLeft"
                  data-wow-delay="0.7s"
                  style={{
                    visibility: 'visible',
                    animationDelay: '0.7s',
                    animationName: 'fadeInLeft',
                  }}
                >
                  <div className="timeline-icon">
                    <i className="fa fa-coin" aria-hidden="true"></i>
                  </div>
                  <div className="timeline-text">
                    <h6>$YIELD</h6>
                    <p>YIELD Token</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-timeline-area">
            <div
              className="timeline-date wow fadeInLeft"
              data-wow-delay="0.1s"
              style={{ visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeInLeft' }}
            >
              <p>Q4 2023</p>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  className="single-timeline-content d-flex wow fadeInLeft"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: 'visible',
                    animationDelay: '0.3s',
                    animationName: 'fadeInLeft',
                  }}
                >
                  <div className="timeline-icon">
                    <i className="fa fa-sparkles" aria-hidden="true"></i>
                  </div>
                  <div className="timeline-text">
                    <h6>Optimized Vaults</h6>
                    <p>Optimized Vaults launch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-timeline-area">
            <div
              className="timeline-date wow fadeInLeft"
              data-wow-delay="0.1s"
              style={{ visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeInLeft' }}
            >
              <p>2024</p>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  className="single-timeline-content d-flex wow fadeInLeft"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: 'visible',
                    animationDelay: '0.3s',
                    animationName: 'fadeInLeft',
                  }}
                >
                  <div className="timeline-icon">
                    <i className="fa fa-handshake" aria-hidden="true"></i>
                  </div>
                  <div className="timeline-text">
                    <h6>Keep building</h6>
                    <p>Bring yield farming to the next level together</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        // Steps
      }
    </>
  );
});
