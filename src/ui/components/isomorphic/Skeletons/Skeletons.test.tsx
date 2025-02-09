import "@testing-library/jest-dom";
import { render } from '@testing-library/react';
import {
  SearchResultsSkeleton,
  BreadcrumbSkeleton,
  ProductDetailsSkeleton,
} from './Skeletons';

describe('Skeletons components', () => {
  it('renders SearchResultsSkeleton with the correct number of items', () => {
    const { container } = render(<SearchResultsSkeleton count={5} />);
    const items = container.getElementsByClassName('SearchResultsSkeleton_item');
    expect(items.length).toBe(5);
  });

  it('renders BreadcrumbSkeleton with the correct number of items', () => {
    const { container } = render(<BreadcrumbSkeleton count={3} />);
    const items = container.getElementsByClassName('BreadcrumbSkeleton_item');
    expect(items.length).toBe(3);
  });

  it('renders ProductDetailsSkeleton correctly', () => {
    const { container } = render(<ProductDetailsSkeleton />);
    const picture = container.getElementsByClassName('ProductDetailsSkeleton_picture')[0];
    const attrs = container.getElementsByClassName('ProductDetailsSkeleton_attrs')[0];
    const title = container.getElementsByClassName('ProductDetailsSkeleton_title')[0];
    const btn = container.getElementsByClassName('ProductDetailsSkeleton_btn')[0];

    expect(picture).toBeInTheDocument();
    expect(attrs).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
});
