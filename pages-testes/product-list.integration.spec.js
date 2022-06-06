import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import ProductList from '../pages';
import Response from 'miragejs';
import { makeServer } from '../miragejs/server';
import userEvent from '@testing-library/user-event';


const renderProductList = () => {
  render(<ProductList />);
};

describe('Product List', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });
  it('should render ProductList', () => {
    renderProductList();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  xit('should render the ProductCard component 10 times', async () => {
    server.createList('product', 10);
    console.log(server.createList('product', 10));
    renderProductList();

    await waitFor(() => {
      expect(screen.queryAllByTestId('product-card')).toHaveLength(10);
    });
  });

  it('should render the "no products message"', async () => {
    renderProductList();
    await waitFor(() => {
      expect(screen.getByTestId('no-products')).toBeInTheDocument();
    });
  });

  it('should display error message when promise rejects', async () => {
    server.get('products', () => {
      return new Response(500, {}, '');
    });

    renderProductList();
    await waitFor(() => {
      expect(screen.getByTestId('server-error')).toBeInTheDocument();
      expect(screen.queryByTestId('no-products')).toBeNull();
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0);
    });
  });
  it('should filter the product list when a search', async () => {
    
    const screenTerm = 'relogio bonito'
    server.createList('product', 2);

    server.create('product', {
      title: screenTerm
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(3)
    });

    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox')

    await userEvent.type(input, screenTerm);
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(1)
    });

  });
  it('should display the total quantity of products ', async () => {
    server.createList('product', 10);

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText(/10 Products/i)).toBeInTheDocument()
    })
  });

  it('should display product (singular) when there is only 1 product', async () => {
    server.create('product', 1);

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText(/1 Product$/i)).toBeInTheDocument()
    })
  });

  it('should display proper quantity when list is filtered', async () => {
    
    const screenTerm = 'relogio bonito'
    server.createList('product', 2);

    server.create('product', {
      title: screenTerm
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText(/3 products/i)).toBeInTheDocument()
    });

    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox')

    await userEvent.type(input, screenTerm);
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText(/1 product$/i)).toBeInTheDocument()
    });

  });

});
