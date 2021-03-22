import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    allStocks: [],
    portfolioStocks: [],
    searchValue: '',
    sort: 'None',
    filter: "All"
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks').then(response => response.json())
    .then(allStocks => this.setState({allStocks}))
  }

  addToPortfolio = (newStock) => {
    if (!this.state.portfolioStocks.find(stock => stock === newStock)) {
      this.setState({
        portfolioStocks: [...this.state.portfolioStocks, newStock]
      })
    }
  }

  removeFromPortfolio = (newStock) => {
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(stock => stock !== newStock)
    })
  }

  handleSearch = (searchValue) => {
    this.setState({searchValue})
  }

  handleSort = (sortValue) => {
    this.setState({
      sort: sortValue
    })
  }

  handleFilter = (filterValue) => {
    this.setState({
      filter: filterValue
    })
  }

  stocksDisplayed = () => {
    //not updating state of allStocks, but simply creating new variable to be returned to manipulate what is displayed on the page
    //1) search
    let stocksDisplayed = this.state.allStocks.filter(stock => {
      return stock.name.toLowerCase().includes(this.state.searchValue)
    })

    //3)filter
    if (this.state.filter !== "All") {
      stocksDisplayed = stocksDisplayed.filter(stock => stock.type == this.state.filter)
    }

    //2) sort
    switch(this.state.sort) {
      case "Alphabetically":
        return stocksDisplayed.sort((a, b) => a.name > b.name ? 1 : -1)
      case "Price":
        return stocksDisplayed.sort((a, b) => a.price > b.price ? 1 : -1)
      case "None":
        return stocksDisplayed
    }

  }



  render() {
    return (
      <div>
        <SearchBar handleSearch={this.handleSearch} sort={this.state.sort} handleSort={this.handleSort} handleFilter={this.handleFilter}/>

          <div className="row">
            <div className="col-8">
              {/* <StockContainer allStocks={this.state.allStocks} addToPortfolio={this.addToPortfolio}/> */}
              <StockContainer allStocks={this.stocksDisplayed()} addToPortfolio={this.addToPortfolio}/>
            </div>
            <div className="col-4">

              <PortfolioContainer portfolioStocks={this.state.portfolioStocks} removeFromPortfolio={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;


// individual stock gets universal prop of 'manageStocks'
// parent containers get specified prop of addToPortfolio or removeFromPortfolio