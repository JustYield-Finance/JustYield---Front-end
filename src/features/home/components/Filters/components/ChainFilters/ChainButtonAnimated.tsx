import React, { FC, memo, SVGProps, useCallback, useRef } from 'react';
import { ChainEntity } from '../../../../../data/entities/chain';
import { selectAllChainIds, selectChainById } from '../../../../../data/selectors/chains';
import { makeStyles, Tooltip } from '@material-ui/core';
import { styles } from './styles';
import clsx from 'clsx';
import { useAppSelector } from '../../../../../../store';

import { CircleMenu, CircleMenuItem, TooltipPlacement } from 'react-circular-menu';
import { Button } from '../../../../../../components/Button';

import LinkIcon from '@material-ui/icons/Link';

var beefyState;

const useStyles = makeStyles(styles);
const networkIcons = require.context(
  '!@svgr/webpack?svgo=false!../../../../../../images/networks/',
  false,
  /\.svg$/
);

type AnimatedChainButtonProps = {
  id: ChainEntity['id'];
  selected: boolean;
  onChange: (selected: boolean, id: ChainEntity['id']) => void;
};

const AnimatedChainButton: FC<AnimatedChainButtonProps> = ({ id, selected, onChange }) => {
  const classes = useStyles();
  const chain = useAppSelector(state => selectChainById(state, id));
  const handleChange = useCallback(() => {
    onChange(!selected, id);
  }, [id, selected, onChange]);
  const Icon: FC<SVGProps<SVGSVGElement>> = networkIcons(`./${id}.svg`).default;

  return (
    <button
      onClick={handleChange}
      className={clsx(classes.button, { [classes.selected]: selected })}
    >
      <Icon className={classes.icon} width={24} height={24} />
    </button>
  );
};

export type ChainButtonSelectorProps = {
  selected: ChainEntity['id'][];
  onChange: (selected: ChainEntity['id'][]) => void;
  className?: string;
};
export const ChainButtonAnimated = memo<ChainButtonSelectorProps>(function ChainButtonSelector({
  selected,
  onChange,
  className,
}) {
  const classes = useStyles();
  const chainIds = useAppSelector(selectAllChainIds);
  const anchorEl = useRef();
  useAppSelector(state => (beefyState = state));
  const handleChange = useCallback(
    (isSelected, id) => {
      if (isSelected) {
        if (!selected.includes(id)) {
          const newSelected = [...selected, id];
          // if all selected, return empty array to represent not-filtered
          onChange(newSelected.length < chainIds.length ? newSelected : []);
        }
      } else if (!isSelected) {
        if (selected.length === 0) {
          // special handling:
          // first chain unselected should be treated as unselecting all other chains instead
          onChange([id]);
        } else if (selected.includes(id)) {
          onChange(selected.filter(selectedId => selectedId !== id));
        }
      }
    },
    [chainIds, selected, onChange]
  );

  return (
    <CircleMenu
      startAngle={-90}
      rotationAngle={360}
      itemSize={2}
      radius={5}
      rotationAngleInclusive={false}
      menuToggleElement={
        <Button className={classes.selector} variant="filter" size="sm" ref={anchorEl}>
          <LinkIcon />
        </Button>
      }
    >
      {chainIds.map(id => (
        <CircleMenuItem style={{ background: '#fff', border: 'solid 2px #c6c09f' }}>
          <AnimatedChainButton
            key={id}
            id={id}
            selected={selected.length === 0 || selected.includes(id)}
            onChange={handleChange}
          />
        </CircleMenuItem>
      ))}
    </CircleMenu>
  );
});
