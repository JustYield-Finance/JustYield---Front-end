import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  virtualVaultsList: {
    border: 'solid 2px #c9c49c',
    width: '33%',
  },
  newVirtualVaultsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gridGap: '10px',
  },
});
