import React, { Component } from 'react'
import Link from './Link'
import Profile from './Profile'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LinkList extends Component {

  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY })

    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    store.writeQuery({ query: FEED_QUERY, data })
  }

  render() {
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>
    }

    const linksToRender = this.props.feedQuery.feed.links

    return (
      <div className="flex justify-around">
        <div className="tweet-list">
          {linksToRender.map((link, index) => (
            <Link key={link.id} updateStoreAfterVote={this._updateCacheAfterVote} index={index} link={link}/>
          ))}
        </div>
        <div className="profile-card">
          <Profile />
        </div>
      </div>
    )
  }
}

export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export default graphql(FEED_QUERY, { name: 'feedQuery' }) (LinkList)
