import {Component} from 'react'
import {MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

import './index.css'

const totalPages = 4
const page = 1

class Counter extends Component {
  state = {currentPage: page}

  onDecrement = () => {
    const {currentPage} = this.state
    const {activePageFunction} = this.props
    if (currentPage > 1) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage - 1}),
        activePageFunction(currentPage - 1),
      )
    }
  }

  onIncrement = () => {
    const {currentPage} = this.state
    const {activePageFunction} = this.props
    if (currentPage < totalPages) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage + 1}),
        activePageFunction(currentPage + 1),
      )
    }
  }

  render() {
    const {currentPage} = this.state
    return (
      <div className="counter-bg-container">
        <button
          className="page-change-button"
          type="button"
          onClick={this.onDecrement}
        >
          {' '}
          <MdOutlineKeyboardArrowLeft />
        </button>
        <div className="home-route-pages-class">
          <span className="home-route-pages-class">{currentPage}</span> of{' '}
          {totalPages}
        </div>
        <button
          className="page-change-button"
          type="button"
          onClick={this.onIncrement}
        >
          {' '}
          <MdKeyboardArrowRight />
        </button>
      </div>
    )
  }
}

export default Counter
