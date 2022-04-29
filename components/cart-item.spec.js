import { screen, render, fireEvent } from "@testing-library/react"
import CartItem from './cart-item';

const product = {
  title: "Relogio",
  price: "22.00",
  image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
}

const renderCartItem = () => {
  render(<CartItem product={product}/>);
}

describe('CartItem', () => {
    it('should render ProductCard', () => {
      renderCartItem();
      expect(screen.getByTestId('cart-item')).toBeInTheDocument();
    });

    it('should display proper content', () => {
      renderCartItem();
      const image = screen.getByTestId('image');
      expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument()
      expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument()
      expect(screen.getByTestId('image')).toHaveStyle({
        backgroundImage: product.image
      })

      expect(image).toHaveProperty('src', product.image);
      expect(image).toHaveProperty('alt', product.title);
     
    });

    it('shoud display  as initial quantity', ()=> {
      renderCartItem();

      expect(screen.getByTestId('quantity').textContent).toEqual('1')
    });

    it('shoud increase quantity by 1 when second button is clicked', async () => {
      renderCartItem();

      const [_, button] = screen.getAllByRole('button');

      await fireEvent.click(button);
      expect(screen.getByTestId('quantity').textContent).toBe('2')

    });
    it('shoud decrease quantity by 1 when first button is clicked', async () => {
      renderCartItem();

      const [buttonDecrease, buttonIncrease] = screen.getAllByRole('button');
      const quantity = screen.getByTestId('quantity');

      await fireEvent.click(buttonIncrease);
      expect(quantity.textContent).toBe('2')

      await fireEvent.click(buttonDecrease);
      expect(quantity.textContent).toBe('1')
    });
   it('shoud not go bellow zero in the quantity', async () => {
      renderCartItem();

      const [buttonDecrease] = screen.getAllByRole('button');
      const quantity = screen.getByTestId('quantity');

      expect(quantity.textContent).toBe('1')


      await fireEvent.click(buttonDecrease);
      await fireEvent.click(buttonDecrease);

      expect(quantity.textContent).toBe('0')
    });

});
