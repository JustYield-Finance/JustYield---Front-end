import { FilteredVaultsState } from '../../../../../data/reducers/filtered-vaults';

/*export const CATEGORY_OPTIONS: Record<FilteredVaultsState['vaultCategory'], string> = {
  all: 'Filter-CatgryAll',
  featured: 'Filter-CatgryFeatured',
  stable: 'Filter-CatgryStabl',
  bluechip: 'Filter-CatgryBlue',
  beefy: 'Filter-CatgryBeefy',
};*/

export const CATEGORY_OPTIONS: Record<FilteredVaultsState['vaultCategoryReduced'], string> = {
  all: 'Filter-CatgryAll',
  stable: 'Filter-CatgryStabl',
};
