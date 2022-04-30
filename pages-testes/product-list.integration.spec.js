import { screen, render } from '@testing-library/react';
import ProductList from '../pages'


describe('Product List', () => {
  it('should render ProductList', () => {
    render(<ProductList />)

    expect(screen.getByTestId('product-list')).toBeInTheDocument()
  });
});
