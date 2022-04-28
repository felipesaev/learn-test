import { screen, render, fireEvent } from "@testing-library/react"
import CartItem from './cart-item';

const product = {
  title: "Relogio",
  price: "22.00",
  image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
}

const renderProductCard = () => {
  render(<CartItem product={product}/>);
}

describe('CartItem', () => {
    it('should render ProductCard', () => {
      renderProductCard();
      expect(screen.getByTestId('cart-item')).toBeInTheDocument();
    });

    it('should display proper content', () => {
      renderProductCard();
      const image = screen.getByTestId('image');
      expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument()
      expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument()
      expect(screen.getByTestId('image')).toHaveStyle({
        backgroundImage: product.image
      })

      expect(image).toHaveProperty('src', product.image);
      expect(image).toHaveProperty('alt', product.title);
     
    });
});
