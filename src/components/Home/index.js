import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantsDetails from '../RestaurantsDetails'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <RestaurantsDetails />
        <Footer />
      </>
    )
  }
}

export default Home
