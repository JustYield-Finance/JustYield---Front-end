import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { ReactComponent as IconGithub } from '../../images/socials/github.svg';
import { ReactComponent as IconTelegram } from '../../images/socials/telegram.svg';
import { ReactComponent as IconDiscord } from '../../images/socials/discord.svg';
import { ReactComponent as IconTwitter } from '../../images/socials/twitter.svg';
import { ReactComponent as IconReddit } from '../../images/socials/reddit.svg';

// Re-using header translations, allowing overwrite with footer specific ones
const navLinks = [
  /*{
    title: ['Footer-Proposals', 'Header-Proposals'],
    path: 'https://vote.justyield.finance',
  },
  {
    title: ['Footer-Stats', 'Header-Stats'],
    path: 'https://dashboard.justyield.com',
  },
  {
    title: ['Footer-News', 'Header-News'],
    path: 'https://justyield.com/articles/',
  },*/
  {
    title: ['Footer-Docs', 'Header-Docs'],
    path: 'https://docs.justyield.finance',
  } /*,
  {
    title: 'Footer-Audit',
    path: 'https://github.com/JustYield-Finance/justyield-audits',
  },
  {
    title: 'Footer-MediaKit',
    path: 'https://justyield.com/media-kit/',
  },*/,
];

const socialLinks = [
  {
    title: 'GitHub',
    path: 'https://github.com/JustYield-Finance',
    Icon: IconGithub,
  },
  {
    title: 'Telegram',
    path: 'https://t.me/JustYield',
    Icon: IconTelegram,
  },
  {
    title: 'Discord',
    path: 'https://discord.gg/bbdvQJ4Avg',
    Icon: IconDiscord,
  },
  {
    title: 'Twitter',
    path: 'https://twitter.com/JustYield_Fi',
    Icon: IconTwitter,
  } /*,
  {
    title: 'Reddit',
    path: 'https://www.reddit.com/r/JustYield/',
    Icon: IconReddit,
  },*/,
];

const useStyles = makeStyles(styles);

// Memo: Static footer, no need to re-render when parent does
export const Footer = memo(function () {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.footer}>
      <ul className={classes.nav}>
        {navLinks.map(({ title, path }) => (
          <li key={path} className={classes.navItem}>
            <a href={path} target="_blank" rel="noopener" className={classes.navLink}>
              {t(title)}
            </a>
          </li>
        ))}
      </ul>
      <ul className={classes.nav}>
        {socialLinks.map(({ title, path, Icon }) => (
          <li key={path} className={classes.navItem}>
            <a
              href={path}
              target="_blank"
              rel="noopener"
              className={classes.navLink}
              title={t(title)}
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

// This keeps the footer at the bottom of the page when the page is under 100vh
export const WrappedFooter = memo(function WrappedFooter({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTop}>{children}</div>
      {
        //<Footer />
      }
    </div>
  );
});
