import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  virtualVaultsList: {
    border: 'solid 2px #c9c49c',
    width: '25%',
  },
  newVirtualVaultsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridGap: '10px',
  },
});