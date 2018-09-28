import React from 'react'
import { Switch, Route } from 'react-router-dom'

import BookMain from './components/pages/BookMain'
import BookSearch from './components/pages/BookSearch'
import NoMatch from './components/NoMatch'
import './App.css'

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route exact path='/' component={BookMain} />
                    <Route path='/search' component={BookSearch} />
                    <Route component={NoMatch} />
                </Switch>

            </div>
        )
    }
}

export default BooksApp
