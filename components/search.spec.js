import Search from './search';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const doSearch = jest.fn();

describe('Search', () => {
  it('should render Search component', () => {
    render(<Search />);

    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('should render a input type equals search', () => {
    render(<Search doSearch={doSearch}/>);

    expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search')
  });

  it('should render form', () => {
    render(<Search />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  
  it('should  call props.doSearch() when the user input',  async () => {
    render(<Search doSearch={doSearch} />);
    
    const inputText = 'some text here'
    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');
  
    await userEvent.type(input, inputText)
    await fireEvent.submit(form);
  
    expect(doSearch).toHaveBeenCalledWith(inputText)
  }); 
});


